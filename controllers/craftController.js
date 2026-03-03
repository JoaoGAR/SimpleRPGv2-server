const { rerollItemAbilities, rerollItemBaseTier } = require('../services/itemService');

async function handleReroll(res, action, successMessage) {
    const item = await action();

    if (!item) {
        return res.json({ status: 404, msg: 'Item not found.' });
    }

    return res.json({ status: 200, msg: successMessage, item });
}

async function rerollAbilities(req, res) {
    try {
        const { itemId } = req.body;
        return await handleReroll(res, () => rerollItemAbilities(itemId), 'Item abilities rerolled.');
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server error');
    }
}

async function rerollBaseTier(req, res) {
    try {
        const { itemId } = req.body;
        return await handleReroll(res, () => rerollItemBaseTier(itemId), 'Item base tier rerolled.');
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server error');
    }
}

module.exports = { rerollAbilities, rerollBaseTier };
