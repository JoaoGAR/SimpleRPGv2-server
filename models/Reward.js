const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Reward extends Model {
    static associate(models) {
        Reward.belongsTo(models.BaseItem, {
            foreignKey: 'baseItemId',
            as: 'item',
        });
    }
}

Reward.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    baseItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'BaseItems',
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Reward',
    timestamps: true,
});

module.exports = Reward;