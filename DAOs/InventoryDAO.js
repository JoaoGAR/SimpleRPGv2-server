const ItemSkill = require('../models/ItemSkill');
const Skill = require('../models/Skill');
const Category = require('../models/Category');
const Item = require('../models/Item');
const Character = require('../models/Character');
const Inventory = require('../models/Inventory');
const Tier = require('../models/Tier');
const Ability = require('../models/Ability');
const WeaponAbility = require('../models/WeaponAbility');

Inventory.associate({ Character, Item });

async function getInventoryByCharacter(characterId, inventoryId = null) {

    const key = inventoryId !== null ? { 'characterId': characterId, 'id': inventoryId } : { 'characterId': characterId };

    const inventory = await Inventory.findAll({
        where: key,
        order: [
            ['createdAt', 'ASC'],
        ],
        include: [
            {
                model: Item, as: 'item',
                include: [
                    { model: Tier, as: 'tier' },
                    { model: Category, as: 'category' },
                    {
                        model: ItemSkill, as: 'skills',
                        include: [{ model: Skill, as: 'skill' }]
                    },
                    {
                        model: WeaponAbility, as: 'abilities',
                        include: [{ model: Ability, as: 'ability', include: [{ model: Tier, as: 'tier' }] }]
                    },
                ]
            }
        ],
    });
    return inventory;
}

async function getEquipmentByCharacterId(characterId) {
    const equipment = await Inventory.findAll({
        where: { characterId: characterId, equipped: 1 },
        order: [
            ['createdAt', 'ASC'],
        ],
        include: [
            {
                model: Item, as: 'item',
                include: [
                    { model: Tier, as: 'tier' },
                    { model: Category, as: 'category' },
                    {
                        model: ItemSkill, as: 'skills',
                        include: [{ model: Skill, as: 'skill' }]
                    },
                    {
                        model: WeaponAbility, as: 'abilities',
                        include: [{ model: Ability, as: 'ability', include: [{ model: Tier, as: 'tier' }] }]
                    },
                ]
            }
        ],
    });
    return equipment;
}

module.exports = { getInventoryByCharacter, getEquipmentByCharacterId };