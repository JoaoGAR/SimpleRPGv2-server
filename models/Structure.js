const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Structure = sequelize.define('Structure', {
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
    coordsx: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '500',
    },
    coordsy: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '600',
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '0000x0000',
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    heraldry: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = Structure;