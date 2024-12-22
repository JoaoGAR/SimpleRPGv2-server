const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Inventory = sequelize.define('Inventory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Items',
            key: 'id',
        },
    },
    characterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Characters',
            key: 'id',
        },
    },
    equipped: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: true,
});

Inventory.associate = (models) => {
    Inventory.belongsTo(models.Character, {
        foreignKey: 'characterId',
        as: 'character',
    });
    Inventory.belongsTo(models.Item, {
        foreignKey: 'itemId',
        as: 'item',
    });
};

module.exports = Inventory;