const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Race = sequelize.define('Race', {
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
    history: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '0000x0000',
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '0000x0000',
    },
    heraldry: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '0000x0000',
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '0000x0000',
    },
}, {
    timestamps: true,
});

module.exports = Race;