import { posts } from "../posts/posts.model.js";
import { users } from "../users/users.model.js";


export default async (sequelize) => {

    users.hasMany(posts);
    posts.belongsTo(users);
    
    try {
        await sequelize.authenticate();
        console.log('Соединение с БД было успешно установлено')
    } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e)
    }
}