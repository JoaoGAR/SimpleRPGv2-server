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
        res.status(500).send('Erro no servidor');
    }
}

async function equipItem(req, res) {
    try {
        const userId = req.user.id;
        const { inventoryId, equiped } = req.body;

        let character = await Character.findOne({ where: { userId } });
        const characterId = character.id;
        let inventory = await getInventoryByCharacter(characterId, inventoryId);
        inventory = inventory[0];

        if (!inventory) {
            return res.json({ 'status': 400, 'msg': 'Item não encontrado ou não está no inventário do personagem selecionado.' });

        }

        const itemCategoryId = inventory.item.categoryId;
        let prevEquipment = await Inventory.findOne({
            where: {
                id: { [Op.ne]: inventoryId },
                characterId: characterId,
                equiped: 1
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

        prevEquipment = prevEquipment ? prevEquipment : inventory;

        await prevEquipment.update({ equiped: 0 })
        await inventory.update({ equiped: !equiped });

        await character.update({ armorClass: character.armorClass - prevEquipment.item.armorClass })
        await character.update({ armorClass: character.armorClass + inventory.item.armorClass });

        character = await getCharacterByUser(userId);

        return res.json({ 'status': 200, 'msg': 'Item equipado.', 'prevEquipment': prevEquipment, 'inventory': inventory, 'character': character });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no servidor');
    }
}

module.exports = { getInventory, equipItem };