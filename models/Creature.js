const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Creature extends Model {
    static associate(models) {
        Creature.hasMany(models.Inventory, {
            foreignKey: 'creatureId',
            as: 'inventory',
        });
        Creature.hasMany(models.CreatureSkill, {
            foreignKey: 'creatureId',
            as: 'skills',
        });
    }
}

Creature.init({
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
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0000x0000',
    },
    aggressiveness: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
    },
    strategic: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    armorClass: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 6,
    },

    wellness: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 20,
    },
    exp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
    },
    gold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize,
    modelName: 'Creature',
    timestamps: true,
});

module.exports = Creature;
