const { Op, Sequelize } = require('sequelize');

const { getItem } = require('../DAOs/ItemDAO');

const Item = require('../models/Item');
const Skill = require('../models/Skill');
const Tier = require('../models/Tier');
const Ability = require('../models/Ability');
const ItemSkill = require('../models/ItemSkill');
const WeaponAbility = require('../models/WeaponAbility');
const BaseItem = require('../models/BaseItem');

async function generateItem(baseItem) {
    try {
        const tierId = await getRandomTier();
        const attributeIds = baseItem.attributeId.split(',').map(Number);
        const attributeId = attributeIds[Math.floor(Math.random() * attributeIds.length)];
        const skillId = { 1: 1, 2: 5, 3: 9 };
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
            'baseItemId': baseItem.id,
            'initiative': baseItem.initiative,
            'price': base.price,
        };

        item = await Item.create(item);
        if (baseItem.categoryId == 1) {
            await createItemAbilities(item, skillId[attributeId]);
        } else {
            await createItemSkills(item, attributeIds);
        }

        return await getItem(item.id);
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function rerollItemAbilities(itemId) {
    try {
        const item = await Item.findOne({ where: { id: itemId } });
        if (!item) {
            return null;
        }

        const baseItem = await BaseItem.findOne({ where: { id: item.baseItemId } });
        if (!baseItem) {
            return null;
        }

        if (item.categoryId == 1) {
            await WeaponAbility.destroy({ where: { itemId: item.id } });
            await createItemAbilities(item, item.skillId);
        } else {
            const attributeIds = baseItem.attributeId.split(',').map(Number);
            await ItemSkill.destroy({ where: { itemId: item.id } });
            await createItemSkills(item, attributeIds);
        }

        return await getItem(item.id);
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function rerollItemBaseTier(itemId) {
    try {
        const item = await Item.findOne({ where: { id: itemId } });
        if (!item) {
            return null;
        }

        const baseItem = await BaseItem.findOne({ where: { id: item.baseItemId } });
        if (!baseItem) {
            return null;
        }

        const base = await generateBase(baseItem, item.tierId);

        await Item.update({
            name: base.name,
            image: base.image,
            attack: base.attack,
            armorClass: base.armorClass,
            price: base.price,
        }, {
            where: { id: item.id },
        });

        return await getItem(item.id);
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function getRandomTier() {
    const tiers = await Tier.findAll();
    const totalWeight = tiers.reduce((sum, tier) => sum + tier.weight, 0);
    const random = Math.random() * totalWeight;
    let cumulativeChance = 0;

    for (const tier of tiers) {
        cumulativeChance += tier.weight;
        if (random < cumulativeChance) {
            return tier.id;
        }
    }

    return tiers[tiers.length - 1].id;
}

async function getRandomAttack(minAttack, maxAttack) {
    return Math.floor(Math.random() * (maxAttack - minAttack + 1)) + minAttack;
}

async function createItemSkills(item, attributeIds) {
    let listItemSkills = [];
    const quantity = item.tierId >= 5 ? 4 : item.tierId;

    const skills = await Skill.findAll({
        where: { attributeId: { [Op.in]: attributeIds } },
        attributes: ['id'],
    });

    const randomSkills = skills
        .map(skill => skill.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, quantity);

    for (const skillId of randomSkills) {
        const skillLevel = item.tierId >= 5 ? (Math.floor(Math.random() * 5) + 1) : (Math.floor(Math.random() * 2) + 1);
        listItemSkills.push({
            'itemId': item.id,
            'skillId': skillId,
            'level': skillLevel,
        });
    }

    return await ItemSkill.bulkCreate(listItemSkills);
}

async function createItemAbilities(item, itemSkillId) {
    const offensiveAbilities = await fetchAbilities(itemSkillId, 1, 1, item.id);
    return await WeaponAbility.bulkCreate([...offensiveAbilities]);
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
        'price': baseItem.basePrice,
    };

    const baseWeights = tierId <= 4 ? [50, 30, 15, 5, 0] : [5, 10, 35, 25, 15];

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

    if (baseItem.categoryId == 1) {
        let minAttack = baseItem.minAttack;
        let maxAttack = baseItem.maxAttack;
        maxAttack = tierId < 4 ? Math.round((maxAttack / 2)) : maxAttack;
        minAttack = tierId < 4 ? minAttack : (minAttack + 2);
        attack = await getRandomAttack(minAttack, maxAttack);
        attack = '1d' + (attack + bases.indexOf(baseTier));
    } else {
        base.armorClass = tierId > 4 ? (base.armorClass + 1) : base.armorClass;
    }

    const uniqueBaseItem = baseItem.image.split('.');
    base.image = uniqueBaseItem[(uniqueBaseItem.length - 1)] === 'png' ? `${baseItem.image}` : `${baseItem.image}${baseTier}.png`;

    base.price = baseItem.basePrice * (tierId + 1);
    base.name = `${base.name + ` - ` + baseTier}`;
    base.attack = attack;

    return base;
}

module.exports = {
    generateItem,
    rerollItemAbilities,
    rerollItemBaseTier,
};
