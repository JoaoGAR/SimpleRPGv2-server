const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Tier extends Model {}

Tier.init({
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
    color: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'black',
    },
    background: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'white',
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 20,
    },
}, {
    sequelize,
    modelName: 'Tier',
    timestamps: true,
});

module.exports = Tier;