const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ItemSkill = sequelize.define('ItemSkill', {
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
    skillId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Skills',
            key: 'id',
        },
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    timestamps: true,
});

ItemSkill.associate = (models) => {
    ItemSkill.belongsTo(models.Item, {
        foreignKey: 'itemId',
        as: 'item',
    });
    ItemSkill.belongsTo(models.Skill, {
        foreignKey: 'skillId',
        as: 'skill',
    });
};

module.exports = ItemSkill;