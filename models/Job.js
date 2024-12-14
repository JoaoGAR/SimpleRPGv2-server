const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Job extends Model {
    static associate(models) {
        Job.belongsTo(models.Attribute, {
            foreignKey: 'attributeId',
            as: 'attribute',
        });
        Job.hasMany(models.Requirement, {
            as: 'requirements',
        });
        Job.hasMany(models.Reward, {
            as: 'rewards',
        });
        Job.hasMany(models.JobLocation, {
            foreignKey: 'jobId',
            as: 'locations',
        });
    }
}

Job.init({
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
    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    attributeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Attributes',
            key: 'id',
        },
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
    },
    gold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize,
    modelName: 'Job',
    timestamps: true,
});

module.exports = Job;