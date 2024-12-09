const Tier = require('../models/Tier');
const ItemSkill = require('../models/ItemSkill');
const Skill = require('../models/Skill');
const Ability = require('../models/Ability');
const WeaponAbility = require('../models/WeaponAbility');
const Category = require('../models/Category');
const Item = require('../models/Item');
const Inventory = require('../models/Inventory');

Item.associate({ Tier, Inventory, Category, ItemSkill, WeaponAbility, Skill });
ItemSkill.associate({ Item, Skill });
Ability.associate({ Tier, Skill });
WeaponAbility.associate({ Item, Ability });


async function getItem(id) {

    const item = await Item.findOne({
        where: { id },
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
    });
    return item;
}

module.exports = { getItem };