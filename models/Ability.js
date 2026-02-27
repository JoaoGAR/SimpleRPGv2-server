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
        defaultValue: '1',
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
    actionTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            model: 'ActionTypes',
            key: 'id',
        },
    },
    spellLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    damageTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            model: 'DamageTypes',
            key: 'id',
        },
    },
    requiresAttackRoll: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    requiresSaving_throw: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    Ability.belongsTo(models.Skill, {
        foreignKey: 'savingThrowSkillId',
        as: 'savingThrowSkill',
    });

    if (models.ActionType) {
        Ability.belongsTo(models.ActionType, {
            foreignKey: 'actionTypeId',
            as: 'actionType',
        });
    }

    if (models.DamageType) {
        Ability.belongsTo(models.DamageType, {
            foreignKey: 'damageTypeId',
            as: 'damageType',
        });
    }
};

module.exports = Ability;
