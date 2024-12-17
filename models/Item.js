const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Item extends Model {
    static associate(models) {
        Item.belongsTo(models.Tier, {
            foreignKey: 'tierId',
            as: 'tier',
        });
        Item.hasMany(models.Inventory, {
            foreignKey: 'itemId',
            as: 'inventory',
        });
        Item.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'category',
        });
        Item.hasMany(models.ItemSkill, {
            foreignKey: 'itemId',
            as: 'skills',
        });
        Item.hasMany(models.WeaponAbility, {
            foreignKey: 'itemId',
            as: 'abilities',
        });
        Item.belongsTo(models.Skill, {
            foreignKey: 'skillId',
            as: 'modifier',
        });
    }
}

Item.init({
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
    image: {
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
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            model: 'Categories',
            key: 'id',
        },
    },
    attack: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    armorClass: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    skillId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            model: 'Skills',
            key: 'id',
        },
    },
    price: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
}, {
    sequelize,
    modelName: 'Item',
    timestamps: true,
});

module.exports = Item;