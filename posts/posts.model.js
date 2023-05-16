import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';


export const posts = sequelize.define('Posts', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
    viewsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    imageUrl: {
        type: DataTypes.STRING
    }
});