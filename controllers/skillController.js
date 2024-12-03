const { classCalculator } = require('../utils/classUtils');
const { getCharacterByUser } = require('../DAOs/CharacterDAO');

const Attribute = require('../models/Attribute');
const Skill = require('../models/Skill');
const Character = require('../models/Character');
const CharacterSkill = require('../models/CharacterSkill');
const CharacterAttribute = require('../models/CharacterAttribute');

async function getSkills(req, res) {
    try {
        let queue = await Attribute.findAll({
            order: [['attributeId', 'ASC']], include: [{ model: Skill, as: 'skill' }]
        });
        res.send(queue);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no servidor');
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
        res.status(500).send('Erro no servidor');
    }
}

async function saveCharacterSkills(req, res) {
    let { listCharacterSkills, listCharacterAttributes, skillPoints, classPoints } = req.body;
    const userId = req.user.id;
    listCharacterSkills = listCharacterSkills.filter(skill => skill.level > 0);
    listCharacterAttributes = listCharacterAttributes.filter(attribute => attribute.level > 0);

    try {
        const character = await getCharacterByUser(userId);
        if (!character) {
            return res.status(400).json({ status: 400, msg: 'Personagem não existe ou não vinculado ao usuário logado.' });
        }

        await CharacterSkill.bulkCreate(listCharacterSkills, {
            updateOnDuplicate: ['level'],
        });

        await CharacterAttribute.bulkCreate(listCharacterAttributes, {
            updateOnDuplicate: ['level'],
        });

        const characterData = await getCharacterByUser(userId);
        const calculatedClass = await classCalculator(characterData);
        const characterSubClass = calculatedClass.characterSubClass || character.classId;

        await character.update({
            skillPoints,
            classPoints,
            classId: characterSubClass
        });

        return res.json({ status: 200, msg: 'Atributos salvos.', character });

    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro no servidor');
    }
}

module.exports = { getSkills, getCharacterSkills, saveCharacterSkills };