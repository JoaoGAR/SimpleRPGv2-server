const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Attribute extends Model {
    static associate(models) {
        Attribute.hasMany(models.Skill, {
            foreignKey: 'attributeId',
            as: 'skill',
        });
    }
}

Attribute.init({
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
    color: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'white',
    },
}, {
    sequelize,
    modelName: 'Attribute',
    timestamps: true,
});

module.exports = Attribute;