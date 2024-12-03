const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Character extends Model {
    static associate(models) {
        Character.belongsTo(models.Race, {
            foreignKey: 'raceId',
            as: 'race',
        });
        Character.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
        Character.belongsTo(models.Class, {
            foreignKey: 'classId',
            as: 'class',
        });
        Character.hasMany(models.WorkQueue, {
            foreignKey: 'characterId',
            as: 'queue',
        });
        Character.hasMany(models.CharacterAttribute, {
            foreignKey: 'characterId',
            as: 'attributes',
        });
        Character.hasMany(models.CharacterSkill, {
            foreignKey: 'characterId',
            as: 'skill',
        });
        Character.hasMany(models.Inventory, {
            foreignKey: 'characterId',
            as: 'inventory',
        });
    }
}

Character.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'Já existe um personagem com este nome.',
        },
        validate: {
            notEmpty: {
                msg: 'Nome obrigatório.',
            },
        },
    },
    coordsx: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '200',
    },
    coordsy: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '200',
    },
    raceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Races',
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            model: 'Classes',
            key: 'id',
        },
    },
    inventorySize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
    },
    wellness: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100,
    },
    gold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    classPoints: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    skillPoints: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    movementSpeed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100,
    },
    armorClass: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize,
    modelName: 'Character',
    timestamps: true,
});

module.exports = Character;