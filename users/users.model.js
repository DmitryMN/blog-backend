import { DataTypes } from 'sequelize';
import { sequelize } from "../db/db.js";

export const users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatrUrl: {
        type: DataTypes.STRING
    }
});