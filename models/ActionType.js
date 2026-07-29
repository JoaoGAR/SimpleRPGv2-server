const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ActionType = sequelize.define('ActionType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Name is required.',
            },
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '0000x0000',
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0000x0000',
    },
}, {
    timestamps: true,
});

ActionType.associate = (models) => {
    if (models.Ability) {
        ActionType.hasMany(models.Ability, {
            foreignKey: 'actionTypeId',
            as: 'abilities',
        });
    }
};

module.exports = ActionType;
