const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CharacterSkill = sequelize.define('CharacterSkill', {
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
    characterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Characters',
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
        uniqueCharacterSkill: {
            fields: ['characterId', 'skillId'],
        }
    },
});

CharacterSkill.associate = (models) => {
    CharacterSkill.belongsTo(models.Character, {
        foreignKey: 'characterId',
        as: 'character',
    });
    CharacterSkill.belongsTo(models.Skill, {
        foreignKey: 'skillId',
        as: 'skill',
    });
};

module.exports = CharacterSkill;