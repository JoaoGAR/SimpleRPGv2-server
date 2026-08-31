const { Op } = require('sequelize');
const dayjs = require('dayjs');

const { distanceCalculator, timeCalculator } = require('../utils/distanceUtils');
const { rewardCalculator } = require('../utils/rewardUtils');
const { levelCalculator } = require('../utils/levelUtils');
const { equipmentBonus } = require('../utils/equipmentBonus');
const { calculateDuration } = require('../utils/timeUtils');
const { getCharacterByUser } = require('../DAOs/CharacterDAO');
const { generateItem } = require('./itemService');

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

const TRAVEL_JOB_ID = 1;
const MAX_QUEUED_JOBS = 4;

Requirement.associate({ Skill });
Reward.associate({ Job, BaseItem });
Job.associate({ Attribute, Requirement, Reward, JobLocation });
JobLocation.associate({ Job });
WorkQueue.associate({ Job, Character });

class JobError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.name = 'JobError';
        this.status = status;
    }
}

async function getJobs(userId) {
    let character = await getCharacterByUser(userId);
    if (!character) throw new JobError('Character not found.', 404);

    const jobLocations = await JobLocation.findAll({
        include: [{
            model: Job, as: 'job', include: [
                { model: Attribute, as: 'attribute' },
                { model: Reward, as: 'rewards', include: [{ model: BaseItem, as: 'item' }] },
                {
                    model: Requirement, as: 'requirements',
                    include: [{ model: Skill, as: 'skill', include: [{ model: Attribute, as: 'attribute' }] }],
                },
            ],
        }],
        order: [[{ model: Job, as: 'job' }, { model: Reward, as: 'rewards' }, 'baseItemId', 'ASC']],
    });

    character = await equipmentBonus(character, character.inventory ?? []);
    return jobLocations.filter(({ job }) =>
        (job?.requirements ?? []).every(requirement => {
            const characterSkill = character.skills?.find(skill => skill.skillId === requirement.skillId);
            return (characterSkill?.level ?? 0) + 2 >= requirement.skillLevel;
        })
    );
}

async function startWork(userId, jobId, duration, now = dayjs()) {
    const jobLocation = await JobLocation.findOne({ where: { jobId } });
    if (!jobLocation) throw new JobError('Job not found.', 404);

    const coordsx = Number(jobLocation.coordsx);
    const coordsy = Number(jobLocation.coordsy);
    if (!Number.isFinite(coordsx) || !Number.isFinite(coordsy)) {
        throw new JobError('Invalid job location coordinates.');
    }

    const character = await Character.findOne({ where: { userId } });
    if (!character) throw new JobError('Character not found.', 404);

    const queue = await WorkQueue.findAll({
        where: { characterId: character.id, jobId: { [Op.ne]: TRAVEL_JOB_ID } },
        order: [['endAt', 'ASC'], ['id', 'ASC']],
    });
    if (queue.length >= MAX_QUEUED_JOBS && jobId !== TRAVEL_JOB_ID) {
        throw new JobError('Work queue is full.', 401);
    }

    const lastQueueItem = queue.at(-1);
    if (lastQueueItem) {
        character.coordsx = lastQueueItem.coordsx;
        character.coordsy = lastQueueItem.coordsy;
    }

    const distance = distanceCalculator(character.coordsx, character.coordsy, coordsx, coordsy);
    const travelTime = timeCalculator(distance, character.movementSpeed) / 60;
    const { finalDuration, durationTime: rawDurationTime } = calculateDuration(duration);
    const durationTime = jobId === TRAVEL_JOB_ID ? 0 : rawDurationTime;
    let endAt = now.add(durationTime + travelTime, 'hour');

    if (lastQueueItem && lastQueueItem.jobStatus !== 2) {
        endAt = dayjs(lastQueueItem.endAt).add(durationTime + travelTime, 'hour');
    }

    if (distance > 0 && jobId !== TRAVEL_JOB_ID) {
        await WorkQueue.create({
            duration: 0,
            endAt: now.add(travelTime, 'hour'),
            jobId: TRAVEL_JOB_ID,
            characterId: character.id,
            jobStatus: 0,
            relatedJobId: jobId,
            coordsx,
            coordsy,
        });
    }

    return await WorkQueue.create({
        duration: finalDuration,
        endAt,
        jobId,
        characterId: character.id,
        jobStatus: 0,
        coordsx,
        coordsy,
    });
}

async function finishWork(userId, queueId) {
    let character = await Character.findOne({
        where: { userId },
        include: [{ model: CharacterSkill, as: 'skills' }],
    });
    if (!character) throw new JobError('Character not found.', 404);

    const queue = await WorkQueue.findOne({
        where: { id: queueId, characterId: character.id, jobStatus: 2 },
        include: [{
            model: Job, as: 'job', include: [
                { model: Reward, as: 'rewards', include: [{ model: BaseItem, as: 'item' }] },
                {
                    model: Requirement, as: 'requirements',
                    include: [{ model: Skill, as: 'skill', include: [{ model: Attribute, as: 'attribute' }] }],
                },
            ],
        }],
    });
    if (!queue) throw new JobError('Queue item not found.', 404);

    const [claimed] = await WorkQueue.update(
        { jobStatus: 3 },
        { where: { id: queue.id, characterId: character.id, jobStatus: 2 } },
    );
    if (!claimed) throw new JobError('This work item is already being processed.', 409);

    const travelling = await WorkQueue.findOne({
        where: { jobId: TRAVEL_JOB_ID, characterId: character.id, jobStatus: 2, relatedJobId: queue.jobId },
    });
    const jobResult = await completeJob(character, queue);

    const travellingId = travelling?.id ?? null;
    if (travelling) await travelling.destroy();
    await queue.destroy();

    character = await getCharacterByUser(userId);
    return { jobResult, travellingId, character };
}

async function dismissWork(userId, queueId) {
    const character = await Character.findOne({ where: { userId } });
    if (!character) throw new JobError('Character not found.', 404);

    const queue = await WorkQueue.findOne({ where: { id: queueId, characterId: character.id } });
    if (!queue) throw new JobError('Queue item not found.', 404);

    const travelling = await WorkQueue.findOne({
        where: { jobId: TRAVEL_JOB_ID, characterId: character.id, relatedJobId: queue.jobId },
    });
    const travellingId = travelling?.id ?? null;
    if (travelling) await travelling.destroy();
    await queue.destroy();

    return { travellingId };
}

async function completeJob(character, queue) {
    const jobResult = await rewardCalculator(character, queue);
    const levelCalc = levelCalculator(character, jobResult.experience);
    const updates = {
        experience: levelCalc.totalExp,
        level: levelCalc.level,
        gold: character.gold + jobResult.gold,
    };

    if (levelCalc.levelled) {
        updates.classPoints = character.classPoints + levelCalc.classPoints;
        updates.skillPoints = character.skillPoints + levelCalc.skillPoints;
    }
    await character.update(updates);

    const createdItems = [];
    for (const reward of jobResult.rewards) {
        const item = await generateItem(reward.item);
        if (!item) continue;

        createdItems.push(item);
        await Inventory.create({ itemId: item.id, characterId: character.id });
    }

    return { ...jobResult, rewards: createdItems };
}

module.exports = {
    JobError,
    completeJob,
    dismissWork,
    finishWork,
    getJobs,
    startWork,
};
