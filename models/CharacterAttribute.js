const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CharacterAttribute = sequelize.define('CharacterAttribute', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    characterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Characters',
            key: 'id',
        },
    },
    attributeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Attributes',
            key: 'id',
        },
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: true,
    uniqueKeys: {
        uniqueCharacterAttribute: {
            fields: ['characterId', 'attributeId'],
        }
    },
});

CharacterAttribute.associate = (models) => {
    CharacterAttribute.belongsTo(models.Character, {
        foreignKey: 'characterId',
        as: 'character',
    });
    CharacterAttribute.belongsTo(models.Attribute, {
        foreignKey: 'attributeId',
        as: 'attributes',
    });
};

module.exports = CharacterAttribute;