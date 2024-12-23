const fs = require('fs');
const path = require('path');

const getItemImage = async (baseItemPath, tier) => {
    let tierNumber = Number(tier.split('t')[1]);
    while (tierNumber >= 0) {
        const imagePath = path.resolve(`./${baseItemPath}${tier}.png`);
        if (fs.existsSync(imagePath)) {
            return `${baseItemPath}${tier}.png`;
        }
        tierNumber--;
    }

    return `${baseItemPath}t0.png`;
};

module.exports = { getItemImage };