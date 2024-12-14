const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class JobLocation extends Model {
    static associate(models) {
        JobLocation.belongsTo(models.Job, {
            foreignKey: 'jobId',
            as: 'job',
        });
    }
}

JobLocation.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Jobs',
            key: 'id',
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
}, {
    sequelize,
    modelName: 'JobLocation',
    timestamps: true,
});

module.exports = JobLocation;