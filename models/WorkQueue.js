const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class WorkQueue extends Model {
    static associate(models) {
        WorkQueue.belongsTo(models.Job, {
            foreignKey: 'jobId',
            as: 'job',
        });
        WorkQueue.belongsTo(models.Character, {
            foreignKey: 'characterId',
            as: 'character',
        });
    }
}

WorkQueue.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    endAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Jobs',
            key: 'id',
        },
    },
    characterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Characters',
            key: 'id',
        },
    },
    jobStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    relatedJobId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    coordsx: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    coordsy: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
}, {
    sequelize,
    modelName: 'WorkQueue',
    timestamps: true,
});

module.exports = WorkQueue;