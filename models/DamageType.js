const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const DamageType = sequelize.define('DamageType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PHYS',
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'xxxx',
    },
}, {
    timestamps: true,
});

DamageType.associate = (models) => {
    if (models.Ability) {
        DamageType.hasMany(models.Ability, {
            foreignKey: 'damageTypeId',
            as: 'abilities',
        });
    }
};

module.exports = DamageType;
