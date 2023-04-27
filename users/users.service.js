import { users } from "./users.model.js";

export const userService = {
    async createUser(user) {
        const candidate = await users.create(user);
        return candidate;
    }
}