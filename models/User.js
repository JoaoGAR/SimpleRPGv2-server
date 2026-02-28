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
                msg: 'Name is required.',
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'Email is already in use.',
        },
        validate: {
            isEmail: {
                msg: 'Please provide a valid email.',
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8],
                msg: 'Password must be at least 8 characters long.',
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