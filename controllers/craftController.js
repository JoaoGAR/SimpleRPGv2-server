const { rerollItemAbilities, rerollItemBaseTier } = require('../services/itemService');
const Inventory = require('../models/Inventory');
const { positiveInteger, badRequest } = require('../utils/requestValidation');

async function handleReroll(req, res, action, successMessage) {
    const itemId = positiveInteger(req.body.itemId);
    if (!itemId) return badRequest(res, 'Invalid item.');
    const owned = await Inventory.findOne({ where: { itemId, characterId: req.character.id } });
    if (!owned) return res.status(404).json({ status: 404, msg: 'Item not found.' });
    const item = await action(itemId);

    if (!item) {
        return res.json({ status: 404, msg: 'Item not found.' });
    }

    return res.json({ status: 200, msg: successMessage, item });
}

async function rerollAbilities(req, res) {
    try {
        return await handleReroll(req, res, rerollItemAbilities, 'Item abilities rerolled.');
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server error');
    }
}

async function rerollBaseTier(req, res) {
    try {
        return await handleReroll(req, res, rerollItemBaseTier, 'Item base tier rerolled.');
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server error');
    }
}

module.exports = { rerollAbilities, rerollBaseTier };
