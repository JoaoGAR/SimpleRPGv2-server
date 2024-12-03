const { Sequelize } = require('sequelize');
const { getItem } = require('../DAOs/ItemDAO');

const Skill = require('../models/Skill');
const Tier = require('../models/Tier');
const Ability = require('../models/Ability');
const Category = require('../models/Category');
const ItemSkill = require('../models/ItemSkill');
const WeaponAbility = require('../models/WeaponAbility');
const Item = require('../models/Item');
const BaseItem = require('../models/BaseItem');

BaseItem.associate({ Category });

async function generateItem(baseItem) {
    try {

        const tierId = await getRandomTier();
        const attributeId = baseItem.attributeId;
        let attack = null;
        let armorClass = baseItem.armorClass > 0 && tierId > 4 ? (baseItem.armorClass + 2) : baseItem.armorClass;

        if (baseItem.categoryId == 7) {
            let minAttack = baseItem.minAttack;
            let maxAttack = baseItem.maxAttack;
            maxAttack = tierId < 4 ? Math.round((maxAttack / 2)) : maxAttack;
            minAttack = tierId < 4 ? minAttack : (minAttack + 2);
            attack = await getRandomAttack(minAttack, maxAttack);
            attack = '1d' + attack;
        }

        let item = {
            'name': baseItem.name,
            'description': baseItem.description,
            'icon': baseItem.icon,
            'image': baseItem.image,
            'categoryId': baseItem.categoryId,
            'tierId': tierId,
            'attack': attack,
            'armorClass': armorClass,
        };

        item = await Item.create(item);
        if (item.categoryId === 7) {
            const abilities = await createItemAbilities(item, attributeId);
        } else {
            const skills = await createItemSkills(item, attributeId);
        }

        item = await getItem(item.id);
        return item;

    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function getRandomTier() {
    const tiers = await Tier.findAll();
    const random = Math.floor(Math.random() * 100);
    let cumulativeChance = 0;

    for (const tier of tiers) {
        cumulativeChance += tier.weight;
        if (random < cumulativeChance) {
            return tier.id;
        }
    }
    return 1;
}

async function getRandomAttack(minAttack, maxAttack) {
    return Math.floor(Math.random() * (maxAttack - minAttack + 1)) + minAttack;
}

async function createItemSkills(item, attributeId) {

    let listItemSkills = [];
    const quantity = item.tierId > 5 ? 4 : item.tierId;
    const skills = await Skill.findAll({
        where: {
            'attributeId': attributeId,
        },
        order: [Sequelize.literal('RAND()')],
        limit: quantity,
    });

    for (const skill of skills) {
        const skillLevel = item.tierId > 4 ? (Math.floor(Math.random() * 5) + 1) : (Math.floor(Math.random() * 2) + 1);
        let objSkill = {
            'itemId': item.id,
            'skillId': skill.id,
            'level': skillLevel,
        };
        listItemSkills.push(objSkill);
    }

    const itemSkills = await ItemSkill.bulkCreate(listItemSkills);
    return itemSkills;

}

async function createItemAbilities(item, attributeId) {

    const config = {
        1: { skillId: 1, offensive: 1, defensive: 2 },
        2: { skillId: 3, offensive: 3, defensive: 0 },
        3: { skillId: 5, offensive: 2, defensive: 1 },
    };
    const { skillId, offensive: offensiveQty, defensive: defensiveQty } = config[attributeId] || { skillId: 1, offensive: 2, defensive: 1 };
    const offensiveAbilities = await fetchAbilities(skillId, 1, offensiveQty, item.id);
    const defensiveAbilities = await fetchAbilities(skillId, 2, defensiveQty, item.id);
    const itemAbilities = await WeaponAbility.bulkCreate([...offensiveAbilities, ...defensiveAbilities]);
    return itemAbilities;

}

async function fetchAbilities(skillId, typeId, quantity, itemId) {
    const listAbilities = [];
    const abilities = await Ability.findAll({
        where: {
            'skillId': skillId,
            'typeId': typeId,
        },
        order: [Sequelize.literal('RAND()')],
        limit: quantity,
    });

    for (const ability of abilities) {
        listAbilities.push({
            itemId: itemId,
            abilityId: ability.id,
        });
    }
    return listAbilities;
}

module.exports = { generateItem };