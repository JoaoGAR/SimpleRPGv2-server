const Inventory = require('../models/Inventory');
const { getItems } = require('../DAOs/ItemDAO');
const { getCharacterByUser } = require('../DAOs/CharacterDAO');

async function fillMarket(req, res) {
    try {
        const { items } = req.query;
        const marketitems = await getItems(items);
        res.send(marketitems);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

async function buyItem(req, res) {
    try {
        const { itemId, itemPrice, characterId } = req.body;
        await Inventory.create({ itemId: itemId, characterId: characterId });
        const character = await getCharacterByUser(null, characterId);
        const gold = (character.gold - itemPrice);
        await character.update({ gold: gold });
        res.json({ status: 200, msg: 'Item added to your inventory.', character: character });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

module.exports = { fillMarket, buyItem };