const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const NPCLocation = sequelize.define('NPCLocation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    npcId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Characters',
            key: 'id',
        },
    },
    structureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Structures',
            key: 'id',
        },
    },
    locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    timestamps: true,
});

NPCLocation.associate = (models) => {
    NPCLocation.belongsTo(models.Structure, {
        foreignKey: 'structureId',
        as: 'structure',
    });
    NPCLocation.belongsTo(models.Character, {
        foreignKey: 'npcId',
        as: 'npc',
        scope: {
            isNPC: 1
        },
    });
};

module.exports = NPCLocation;