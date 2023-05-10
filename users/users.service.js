import { users } from "./users.model.js";

export const userService = {
    async createUser(user) {
        const candidate = await users.create(user);
        return candidate;
    },

    async getUserByEmail(email) {
        const user = await users.findOne({ where: {email}, include: {all: true}});
        return user;
    }

}