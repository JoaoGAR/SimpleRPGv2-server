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
        const skillId = { 1: 1, 2: 3, 3: 5 };
        const base = await generateBase(baseItem, tierId);

        let item = {
            'name': base.name,
            'description': baseItem.description,
            'icon': baseItem.icon,
            'image': base.image,
            'categoryId': baseItem.categoryId,
            'tierId': tierId,
            'attack': base.attack,
            'armorClass': base.armorClass,
            'skillId': skillId[attributeId],
        };

        item = await Item.create(item);
        if (item.categoryId === 7) {
            const abilities = await createItemAbilities(item, skillId[attributeId]);
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
    const quantity = item.tierId >= 5 ? 4 : item.tierId;

    const skills = await Skill.findAll({
        //where: { attributeId },
        attributes: ['id'],
    });

    const randomSkills = skills
        .map(skill => skill.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, quantity);
    for (const skillId of randomSkills) {
        const skillLevel = item.tierId >= 5 ? (Math.floor(Math.random() * 5) + 1) : (Math.floor(Math.random() * 2) + 1);
        let objSkill = {
            'itemId': item.id,
            'skillId': skillId,
            'level': skillLevel,
        };
        listItemSkills.push(objSkill);
    }

    const itemSkills = await ItemSkill.bulkCreate(listItemSkills);
    return itemSkills;

}

async function createItemAbilities(item, itemSkillId) {

    const offensiveAbilities = await fetchAbilities(itemSkillId, 1, 1, item.id);
    const itemAbilities = await WeaponAbility.bulkCreate([...offensiveAbilities]);
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

async function generateBase(baseItem, tierId) {
    const bases = ['t0', 't1', 't2', 't3', 't4'];
    let attack = null;
    let baseTier = 't0';
    let base = {
        'armorClass': baseItem.armorClass,
        'image': baseItem.image,
        'name': baseItem.name,
        'attack': baseItem.minAttack,
    };

    let baseWeights;
    if (tierId <= 4) {
        baseWeights = [50, 30, 15, 5, 0];
    } else {
        baseWeights = [0, 10, 30, 35, 20];
    }

    const totalWeight = baseWeights.reduce((a, b) => a + b, 0);
    const random = Math.random() * totalWeight;

    let accumulatedWeight = 0;
    for (let i = 0; i < bases.length; i++) {
        accumulatedWeight += baseWeights[i];
        if (random <= accumulatedWeight) {
            baseTier = bases[i];
            break;
        }
    }

    if (baseItem.categoryId == 7) {
        let minAttack = baseItem.minAttack;
        let maxAttack = baseItem.maxAttack;
        maxAttack = tierId < 4 ? Math.round((maxAttack / 2)) : maxAttack;
        minAttack = tierId < 4 ? minAttack : (minAttack + 2);
        attack = await getRandomAttack(minAttack, maxAttack);
        attack = '1d' + (attack + bases.indexOf(baseTier));
    } else {
        base.armorClass = baseItem.armorClass + bases.indexOf(baseTier);
        base.armorClass = tierId > 4 ? (base.armorClass + 2) : base.armorClass;
    }

    base.image = `${baseItem.image + baseTier}.png`;
    base.name = `${base.name + ` - ` + baseTier}`;
    base.attack = attack;

    return base;
}

module.exports = { generateItem };