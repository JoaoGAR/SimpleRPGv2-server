const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const WeaponAbility = sequelize.define('WeaponAbility', {
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
    abilityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Abilities',
            key: 'id',
        },
    },
}, {
    timestamps: true,
});

WeaponAbility.associate = (models) => {
    WeaponAbility.belongsTo(models.Item, {
        foreignKey: 'itemId',
        as: 'item',
    });
    WeaponAbility.belongsTo(models.Ability, {
        foreignKey: 'abilityId',
        as: 'ability',
    });
};

module.exports = WeaponAbility;