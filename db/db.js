import { Sequelize } from 'sequelize';

export const sequelize  = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'blog-app',
});