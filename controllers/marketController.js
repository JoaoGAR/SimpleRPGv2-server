const Inventory = require('../models/Inventory');
const { getItems } = require('../DAOs/ItemDAO');
const { getCharacterByUser } = require('../DAOs/CharacterDAO');
const Item = require('../models/Item');
const { positiveInteger, badRequest } = require('../utils/requestValidation');

async function fillMarket(req, res) {
    try {
        const values = Array.isArray(req.query.items) ? req.query.items : String(req.query.items || '').split(',');
        const items = [...new Set(values.map(positiveInteger).filter(Boolean))];
        if (!items.length || items.length > 100) return badRequest(res, 'Invalid item list.');
        const marketitems = await getItems(items);
        res.send(marketitems);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

async function buyItem(req, res) {
    try {
        const itemId = positiveInteger(req.body.itemId);
        if (!itemId) return badRequest(res, 'Invalid item.');
        const character = await getCharacterByUser(req.user.id);
        const item = await Item.findByPk(itemId);
        if (!character || !item) return res.status(404).json({ msg: 'Character or item not found.' });
        if (!Number.isSafeInteger(item.price) || item.price < 0 || character.gold < item.price) {
            return res.status(400).json({ msg: 'Insufficient gold.' });
        }
        await Inventory.create({ itemId, characterId: character.id });
        await character.update({ gold: character.gold - item.price });
        res.json({ status: 200, msg: 'Item added to your inventory.', character: character });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

module.exports = { fillMarket, buyItem };
