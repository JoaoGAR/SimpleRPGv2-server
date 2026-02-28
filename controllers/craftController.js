const { rerollItemAbilities, rerollItemBaseTier } = require('../services/itemService');

async function rerollAbilities(req, res) {
    try {
        const { itemId } = req.body;
        const item = await rerollItemAbilities(itemId);

        if (!item) {
            return res.json({ status: 404, msg: 'Item not found.' });
        }

        return res.json({ status: 200, msg: 'Item abilities rerolled.', item: item });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

async function rerollBaseTier(req, res) {
    try {
        const { itemId } = req.body;
        const item = await rerollItemBaseTier(itemId);

        if (!item) {
            return res.json({ status: 404, msg: 'Item not found.' });
        }

        return res.json({ status: 200, msg: 'Item base tier rerolled.', item: item });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

module.exports = { rerollAbilities, rerollBaseTier };
