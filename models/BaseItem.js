const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class BaseItem extends Model {
    static associate(models) {
        BaseItem.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'category',
        });
    }
}

BaseItem.init({
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
        defaultValue: 'Item base',
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'base',
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'base',
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
    minAttack: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    maxAttack: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    armorClass: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    attributeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    armorType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    sequelize,
    modelName: 'BaseItem',
    timestamps: true,
});

module.exports = BaseItem;