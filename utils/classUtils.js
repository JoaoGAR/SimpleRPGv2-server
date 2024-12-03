const { Op } = require('sequelize');
const Class = require('../models/Class');

const classCalculator = async (character) => {
    if (!character.attributes || character.attributes.length <= 1) {
        return { characterSubClass: null };
    }

    const [primaryAttr, secondaryAttr] = character.attributes
        .sort((a, b) => b.level - a.level)
        .slice(0, 2)
        .map(attr => attr.attributeId);

    const characterSubClass = await Class.findOne({
        where: {
            [Op.or]: [
                { principalAttribute: primaryAttr, secondaryAttribute: secondaryAttr },
                { principalAttribute: secondaryAttr, secondaryAttribute: primaryAttr }
            ]
        }
    });

    return { characterSubClass: characterSubClass ? characterSubClass.id : null };
};

module.exports = { classCalculator };
