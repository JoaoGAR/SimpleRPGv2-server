const { generateItem: generateItemFromService } = require('../services/itemService');

async function generateItem(baseItem) {
    return await generateItemFromService(baseItem);
}

module.exports = { generateItem };
