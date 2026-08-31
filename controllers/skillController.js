const { classCalculator } = require('../utils/classUtils');
const { getCharacterByUser } = require('../DAOs/CharacterDAO');

const Attribute = require('../models/Attribute');
const Skill = require('../models/Skill');
const Character = require('../models/Character');
const CharacterSkill = require('../models/CharacterSkill');
const CharacterAttribute = require('../models/CharacterAttribute');
const { positiveInteger, badRequest } = require('../utils/requestValidation');

async function getSkills(req, res) {
    try {
        let queue = await Attribute.findAll({
            order: [['id', 'ASC']], include: [{ model: Skill, as: 'skill' }]
        });
        res.send(queue);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

async function getCharacterSkills(req, res) {
    try {
        const userId = req.user.id;
        let character = await Character.findOne({ where: { userId } });
        const characterId = character.id;
        let queue = await CharacterSkill.findAll({
            where: { characterId },
            include: [{
                model: Skill, as: 'skill',
                include: [
                    { model: Attribute, as: 'attribute' }
                ]
            }],
        });
        res.send(queue);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

async function saveCharacterSkills(req, res) {
    const { listCharacterSkills, listCharacterAttributes } = req.body;
    const userId = req.user.id;
    if (!Array.isArray(listCharacterSkills) || !Array.isArray(listCharacterAttributes)) return badRequest(res, 'Invalid skill data.');

    try {
        const character = await getCharacterByUser(userId);
        if (!character) {
            return res.status(400).json({ status: 400, msg: 'Character does not exist or is not linked to the logged-in user.' });
        }

        const skillUpdates = listCharacterSkills.map(({ skillId, level }) => ({ skillId: positiveInteger(skillId), level: Number(level), characterId: character.id }));
        const attributeUpdates = listCharacterAttributes.map(({ attributeId, level }) => ({ attributeId: positiveInteger(attributeId), level: Number(level), characterId: character.id }));
        if ([...skillUpdates, ...attributeUpdates].some(entry => (!entry.skillId && !entry.attributeId) || !Number.isSafeInteger(entry.level) || entry.level < 0)
            || new Set(skillUpdates.map(entry => entry.skillId)).size !== skillUpdates.length
            || new Set(attributeUpdates.map(entry => entry.attributeId)).size !== attributeUpdates.length) return badRequest(res, 'Invalid skill data.');
        const [validSkills, validAttributes, currentSkills, currentAttributes] = await Promise.all([
            Skill.findAll({ where: { id: skillUpdates.map(entry => entry.skillId) }, attributes: ['id'] }),
            Attribute.findAll({ where: { id: attributeUpdates.map(entry => entry.attributeId) }, attributes: ['id'] }),
            CharacterSkill.findAll({ where: { characterId: character.id } }),
            CharacterAttribute.findAll({ where: { characterId: character.id } }),
        ]);
        if (validSkills.length !== skillUpdates.length || validAttributes.length !== attributeUpdates.length) return badRequest(res, 'Invalid skill data.');
        const currentSkillLevels = new Map(currentSkills.map(entry => [entry.skillId, entry.level]));
        const currentAttributeLevels = new Map(currentAttributes.map(entry => [entry.attributeId, entry.level]));
        if (skillUpdates.some(entry => entry.level < (currentSkillLevels.get(entry.skillId) || 0))
            || attributeUpdates.some(entry => entry.level < (currentAttributeLevels.get(entry.attributeId) || 0))) return badRequest(res, 'Points cannot be refunded.');
        const requestedSkillPoints = skillUpdates.reduce((sum, entry) => sum + entry.level - (currentSkillLevels.get(entry.skillId) || 0), 0);
        const requestedClassPoints = attributeUpdates.reduce((sum, entry) => sum + entry.level - (currentAttributeLevels.get(entry.attributeId) || 0), 0);
        if (requestedSkillPoints > character.skillPoints || requestedClassPoints > character.classPoints) return res.status(400).json({ status: 400, msg: 'Insufficient points.' });

        await CharacterSkill.bulkCreate(skillUpdates, {
            updateOnDuplicate: ['level'],
        });

        await CharacterAttribute.bulkCreate(attributeUpdates, {
            updateOnDuplicate: ['level'],
        });

        const characterData = await getCharacterByUser(userId);
        const calculatedClass = await classCalculator(characterData);
        const characterSubClass = calculatedClass.characterSubClass || character.classId;

        await character.update({
            skillPoints: character.skillPoints - requestedSkillPoints,
            classPoints: character.classPoints - requestedClassPoints,
            classId: characterSubClass
        });

        return res.json({ status: 200, msg: 'Attributes saved.', character });

    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
}

module.exports = { getSkills, getCharacterSkills, saveCharacterSkills };
