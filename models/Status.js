const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Status = sequelize.define('Status', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    skillId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Skills',
            key: 'id',
        },
    },
    savingThrowSkillId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: 'Skills',
            key: 'id',
        },
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    stun: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    timestamps: true,
});

Status.associate = (models) => {
    Status.belongsTo(models.Skill, {
        foreignKey: 'skillId',
        as: 'skill',
    });
    Status.belongsTo(models.Skill, {
        foreignKey: 'savingThrowSkillId',
        as: 'savingThrowSkill',
    });
};

module.exports = Status;
