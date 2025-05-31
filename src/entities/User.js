const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    googleId: { // ID único do Google
        type: DataTypes.STRING,
        unique: true,
        allowNull: true, // Pode ser null se o usuário não logar via Google
    },
    githubId: { // ID único do GitHub
        type: DataTypes.STRING,
        unique: true,
        allowNull: true, // Pode ser null se o usuário não logar via GitHub
    },
});

module.exports = User;