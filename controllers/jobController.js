const { Op } = require('sequelize');
const dayjs = require('dayjs');
const { distanceCalculator, timeCalculator } = require('../utils/distanceUtils');
const { rewardCalculator } = require('../utils/rewardUtils');
const { levelCalculator } = require('../utils/levelUtils');
const { equipmentBonus } = require('../utils/equipmentBonus');
const { getResponseMessage } = require('../utils/responseMessages');
const { calculateDuration } = require('../utils/timeUtils');

const { generateItem } = require('../controllers/itemController');
const { getCharacterByUser } = require('../DAOs/CharacterDAO');

const JobLocation = require('../models/JobLocation');
const CharacterSkill = require('../models/CharacterSkill');
const Attribute = require('../models/Attribute');
const Inventory = require('../models/Inventory');
const BaseItem = require('../models/BaseItem');
const Skill = require('../models/Skill');
const Requirement = require('../models/Requirement');
const Reward = require('../models/Reward');
const Job = require('../models/Job');
const Character = require('../models/Character');
const WorkQueue = require('../models/WorkQueue');

Requirement.associate({ Skill });
Reward.associate({ Job, BaseItem });
Job.associate({ Attribute, Requirement, Reward, JobLocation });
JobLocation.associate({ Job });
WorkQueue.associate({ Job, Character });

async function getJobs(req, res) {
    try {
        const userId = req.user.id;
        let character = await getCharacterByUser(userId);
        const equipment = character.inventory;

        const jobsLocations = await JobLocation.findAll({
            include: [{
                model: Job, as: 'job', include: [
                    { model: Attribute, as: 'attribute' },
                    { model: Reward, as: 'rewards', include: [{ model: BaseItem, as: 'item' }] },
                    {
                        model: Requirement, as: 'requirements',
                        include: [{ model: Skill, as: 'skill', include: [{ model: Attribute, as: 'attribute' }] }]
                    },
                ]
            }],
            order: [[{ model: Job, as: 'job' }, { model: Reward, as: 'rewards' }, 'baseItemId', 'ASC']],
        });

        character = equipmentBonus(character, equipment);

        const availableJobs = jobsLocations.filter(jobLocation =>
            jobLocation.job.requirements.every(requirement => {
                const characterSkill = character.skills.find(cs => cs.skillId === requirement.skillId);
                return characterSkill && (characterSkill.level + 2 >= requirement.skillLevel);
            })
        );

        res.send(availableJobs);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(getResponseMessage('serverError'));
    }
}

async function startWork(req, res) {
    const { duration, jobId, jobStatus, coordsx, coordsy } = req.body;
    const userId = req.user.id;
    const now = dayjs();

    try {
        const { finalDuration, durationTime } = calculateDuration(duration);
        const character = await Character.findOne({ where: { userId } });
        const distance = distanceCalculator(character.coordsx, character.coordsy, coordsx, coordsy);
        const travelTime = timeCalculator(distance, character.movementSpeed) / 60;

        let endAt = now.add(durationTime + travelTime, 'hour');
        const queue = await WorkQueue.findAll({ where: { characterId: character.id, jobId: { [Op.ne]: 1 } } });

        if (queue.length >= 4) return res.json({ status: 401, msg: getResponseMessage('queueFull') });

        if (queue.length > 0 && queue[queue.length - 1].jobStatus != 2) {
            endAt = dayjs(queue[queue.length - 1].endAt).add(durationTime + travelTime, 'hour');
        }

        if (distance > 0) {
            await WorkQueue.create({
                duration: 0,
                endAt: now.add(travelTime, 'hour'),
                jobId: 1,
                characterId: character.id,
                jobStatus,
                relatedJobId: jobId
            });
            await character.update({ coordsx, coordsy });
        }

        const newQueue = await WorkQueue.create({
            duration: finalDuration,
            endAt,
            jobId,
            characterId: character.id,
            jobStatus
        });

        res.json({ status: 200, msg: getResponseMessage('workQueued'), queue: newQueue });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(getResponseMessage('serverError'));
    }
}

async function finishWork(req, res) {
    const { queueId } = req.body;
    const userId = req.user.id;

    try {
        let character = await Character.findOne({ where: { userId }, include: [{ model: CharacterSkill, as: 'skills' }] });

        const queue = await WorkQueue.findOne({
            where: { id: queueId, characterId: character.id, jobStatus: 2 },
            include: [{
                model: Job, as: 'job',
                include: [
                    {
                        model: Reward, as: 'rewards',
                        include: [{ model: BaseItem, as: 'item' }]
                    },
                    {
                        model: Requirement, as: 'requirements',
                        include: [{ model: Skill, as: 'skill', include: [{ model: Attribute, as: 'attribute' }] }]
                    },
                ]
            }],
        });

        const travelling = await WorkQueue.findOne({
            where: { jobId: 1, characterId: character.id, jobStatus: 2, relatedJobId: queue.jobId },
        });

        if (!queue) return res.send({ status: 401, message: getResponseMessage('queueNotFound') });

        let jobResult = await rewardCalculator(character, queue);
        const levelCalc = await levelCalculator(character, jobResult.experience);

        await character.update({
            experience: levelCalc.totalExp,
            level: levelCalc.level,
            gold: character.gold + jobResult.gold
        });

        if (levelCalc.levelled) {
            await character.update({
                classPoints: character.classPoints + levelCalc.classPoints,
                skillPoints: character.skillPoints + levelCalc.skillPoints
            });
        }

        const createdItems = [];
        for (const reward of jobResult.rewards) {
            const newItem = await generateItem(reward.item);
            if (newItem) {
                createdItems.push(newItem);
                await Inventory.create({ itemId: newItem.id, characterId: character.id });
            }
        }
        jobResult.rewards = createdItems;

        let travellingId = null;
        if (travelling) {
            await travelling.destroy();
            travellingId = travelling.id;
        };

        await queue.destroy();
        character = await getCharacterByUser(userId);
        res.send({ jobResult, 'status': 200, 'message': getResponseMessage('workCompleted'), 'travellingId': travellingId, 'character': character });

    } catch (error) {
        console.error(error.message);
        res.status(500).send(getResponseMessage('serverError'));
    }
}

async function dismissWork(req, res) {
    const { queueId } = req.body;
    const userId = req.user.id;

    try {
        const character = await Character.findOne({ where: { userId } });
        const queue = await WorkQueue.findOne({ where: { id: queueId, characterId: character.id } });
        const travelling = await WorkQueue.findOne({
            where: { jobId: 1, characterId: character.id, relatedJobId: queue.jobId },
        });

        if (!queue) return res.send({ status: 401, message: getResponseMessage('queueNotFound') });

        let travellingId = null;
        if (travelling) {
            await travelling.destroy();
            travellingId = travelling.id;
        };
        await queue.destroy();

        res.send({ status: 200, message: getResponseMessage('workDismissed'), travellingId: travellingId });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(getResponseMessage('serverError'));
    }
}

module.exports = { getJobs, startWork, finishWork, dismissWork };