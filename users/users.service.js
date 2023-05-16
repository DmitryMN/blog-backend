import { users } from "./users.model.js";

export const userService = {
    async createUser(userData) {
        const user = await users.create(userData);
        return user;
    },

    async getUserByEmail(email) {
        const user = await users.findOne({ where: {email}, include: {all: true}});
        return user;
    },

    async getUserById(id) {
        const user  = await users.findByPk(id);
        return user
    }

}