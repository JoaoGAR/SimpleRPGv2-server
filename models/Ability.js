const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Ability = sequelize.define('Ability', {
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
                msg: 'Nome obrigatório.',
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
    tierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Tiers',
            key: 'id',
        },
    },
    attack: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    typeId: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 1,
    },
    skillId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Skills',
            key: 'id',
        },
    },
    weight: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '50',
    },
}, {
    timestamps: true,
});

Ability.associate = (models) => {
    Ability.belongsTo(models.Tier, {
        foreignKey: 'tierId',
        as: 'tier',
    });
    Ability.belongsTo(models.Skill, {
        foreignKey: 'skillId',
        as: 'skill',
    });
};

module.exports = Ability;