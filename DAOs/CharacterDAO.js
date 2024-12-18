const User = require('../models/User');
const WorkQueue = require('../models/WorkQueue');
const Item = require('../models/Item');
const ItemSkill = require('../models/ItemSkill');
const Attribute = require('../models/Attribute');
const Skill = require('../models/Skill');
const Category = require('../models/Category');
const Tier = require('../models/Tier');
const Inventory = require('../models/Inventory');
const Class = require('../models/Class');
const CharacterAttribute = require('../models/CharacterAttribute');
const CharacterSkill = require('../models/CharacterSkill');
const Character = require('../models/Character');
const Race = require('../models/Race');
const Ability = require('../models/Ability');
const WeaponAbility = require('../models/WeaponAbility');

Attribute.associate({ Skill });
Skill.associate({ Attribute });
CharacterAttribute.associate({ Character, Attribute });
CharacterSkill.associate({ Character, Skill });
Character.associate({ Race, User, Class, WorkQueue, CharacterAttribute, CharacterSkill, Inventory });

async function getCharacterByUser(userId = null, characterId = null) {

    const key = characterId !== null ? { 'id': characterId } : { 'userId': userId };

    let character = await Character.findOne({
        where: key,
        include: [
            { model: Race, as: 'race' },
            { model: Class, as: 'class' },
            { model: CharacterAttribute, as: 'attributes', include: [{ model: Attribute, as: 'attributes' }] },
            { model: CharacterSkill, as: 'skills', include: [{ model: Skill, as: 'skill' }] },
            {
                model: Inventory,
                as: 'inventory',
                required: false,
                where: { equiped: 1 },
                include: [{
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
                }],
            },
        ],
        order: [[{ model: CharacterSkill, as: 'skills' }, { model: Skill, as: 'skill' }, 'attributeId', 'ASC']],
    });

    return character;
}

module.exports = { getCharacterByUser };