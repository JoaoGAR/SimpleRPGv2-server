const Class = require('../models/Class');
const Item = require('../models/Item');
const ItemSkill = require('../models/ItemSkill');
const Attribute = require('../models/Attribute');
const Skill = require('../models/Skill');
const Category = require('../models/Category');
const Tier = require('../models/Tier');
const Inventory = require('../models/Inventory');
const CharacterAttribute = require('../models/CharacterAttribute');
const CharacterSkill = require('../models/CharacterSkill');
const Ability = require('../models/Ability');
const WeaponAbility = require('../models/WeaponAbility');
const Character = require('../models/Character');
const Structure = require('../models/Structure');
const NPCLocation = require('../models/NPCLocation');

NPCLocation.associate({ Structure, Character });

async function getNPCsByLocation(structureId, locationId) {
    const npcs = await NPCLocation.findAll({
        where: { structureId, locationId },
        include: [{
            model: Character, as: 'npc',
            include: [
                { model: Class, as: 'class' },
                { model: CharacterAttribute, as: 'attributes', include: [{ model: Attribute, as: 'attributes' }] },
                { model: CharacterSkill, as: 'skills', include: [{ model: Skill, as: 'skill' }] },
                {
                    model: Inventory,
                    as: 'inventory',
                    required: false,
                    where: { equipped: 1 },
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
                    ]
                },
            ]
        }],
        order: [[{ model: Character, as: 'npc' }, 'level', 'ASC']],
    });
    return npcs;
}

module.exports = { getNPCsByLocation };
