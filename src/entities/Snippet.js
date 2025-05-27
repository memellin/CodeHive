const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Snippet = sequelize.define('Snippet', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'userid', // mapeia o nome real da coluna no banco
        references: {
            model: User,
            key: 'id',
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'createdat' // nome real da coluna no banco
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'updatedat' // nome real da coluna no banco
    },
});

// Definir o relacionamento
User.hasMany(Snippet, { foreignKey: 'userId' });
Snippet.belongsTo(User, { foreignKey: 'userId' });

module.exports = Snippet;