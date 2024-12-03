const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'Email já está em uso.',
        },
        validate: {
            isEmail: {
                msg: 'Insira um e-mail válido.',
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8],
                msg: 'A senha deve ter pelo menos 8 caracteres.',
            },
        },
    },
}, {
    timestamps: true,
});

User.associate = (models) => {
    User.hasOne(models.Character, {
        foreignKey: 'userId',
        as: 'character',
    });
};

module.exports = User;