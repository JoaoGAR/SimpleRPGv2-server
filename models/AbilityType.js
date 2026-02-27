const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AbilityType = sequelize.define('AbilityType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Damage',
    },
}, {
    timestamps: true,
});

AbilityType.associate = (models) => {
    if (models.Ability) {
        AbilityType.hasMany(models.Ability, {
            foreignKey: 'typeId',
            as: 'abilities',
        });
    }
};

module.exports = AbilityType;
