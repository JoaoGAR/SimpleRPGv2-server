const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Requirement extends Model {
    static associate(models) {
        Requirement.belongsTo(models.Skill, {
            foreignKey: 'skillId',
            as: 'skill',
        });
    }
}

Requirement.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    skillId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Skills',
            key: 'id',
        },
    },
    skillLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    sequelize,
    modelName: 'Requirement',
    timestamps: true,
});

module.exports = Requirement;