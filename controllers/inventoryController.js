const { Op } = require('sequelize');
const { getCharacterByUser } = require('../DAOs/CharacterDAO');
const { getInventoryByCharacter } = require('../DAOs/InventoryDAO');

const Item = require('../models/Item');
const Character = require('../models/Character');
const Inventory = require('../models/Inventory');

async function getInventory(req, res) {
    try {
        const userId = req.user.id;
        let character = await Character.findOne({ where: { userId } });
        const characterId = character.id;
        const inventory = await getInventoryByCharacter(characterId, null);
        res.send(inventory);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

async function equipItem(req, res) {
    try {
        const userId = req.user.id;
        const { inventoryId, equipped } = req.body;

        let character = await Character.findOne({ where: { userId } });
        const characterId = character.id;
        let inventory = await getInventoryByCharacter(characterId, inventoryId);
        inventory = inventory[0];

        if (!inventory) {
            return res.json({ 'status': 400, 'msg': "Item not found or not in the selected character's inventory." });

        }

        const itemCategoryId = inventory.item.categoryId;
        let prevEquipment = await Inventory.findOne({
            where: {
                id: { [Op.ne]: inventoryId },
                characterId: characterId,
                equipped: 1
            },
            include: [
                {
                    model: Item, as: 'item',
                    where: {
                        categoryId: itemCategoryId,
                    }
                }
            ],
        });

        let newArmorClass = character.armorClass;
        //prevEquipment = prevEquipment ? prevEquipment : inventory;

        if (prevEquipment) {
            newArmorClass = (character.armorClass - prevEquipment.item.armorClass) + inventory.item.armorClass;
        } else {
            prevEquipment = inventory;
            newArmorClass = character.armorClass + inventory.item.armorClass;
        }

        await prevEquipment.update({ equipped: 0 });
        await inventory.update({ equipped: !equipped });
        await character.update({ armorClass: newArmorClass });

        character = await getCharacterByUser(userId);

        return res.json({ 'status': 200, 'msg': 'Item equipped.', 'prevEquipment': prevEquipment, 'inventory': inventory, 'character': character });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

module.exports = { getInventory, equipItem };