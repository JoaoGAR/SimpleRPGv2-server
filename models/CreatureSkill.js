const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CreatureSkill = sequelize.define('CreatureSkill', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    skillId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Skills',
            key: 'id',
        },
    },
    creatureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Creatures',
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
        uniqueCreatureSkill: {
            fields: ['creatureId', 'skillId'],
        },
    },
});

CreatureSkill.associate = (models) => {
    CreatureSkill.belongsTo(models.Creature, {
        foreignKey: 'creatureId',
        as: 'creature',
    });
    CreatureSkill.belongsTo(models.Skill, {
        foreignKey: 'skillId',
        as: 'skill',
    });
};

module.exports = CreatureSkill;
