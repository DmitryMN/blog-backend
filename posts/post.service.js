import { users } from "../users/users.model.js";
import { posts} from "./posts.model.js"

export const postService = {
    async createPost (postData) { 
        const post = await posts.create(postData);  
        return post;
    },
    async getAllPost() {
        const allPost = await posts.findAll({include: users});
        return allPost;
    },
    async getOnePost(id) {
        const post = await posts.findByPk(id);
        await post.increment('viewsCount');
        await post.reload();
        return post;
    },
    async removePost(_id) {
        const result = await posts.destroy({
            where: {
                id: _id
            }
        });
        return result
    }
}