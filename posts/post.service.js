import { posts} from "./posts.model.js"

export const postService = {
    async createPost (postData) {
        const post = posts.create(postData);
        return post;
    },

    async getAllPost() {
        const allPost = posts.findAll({ raw: true });
        return allPost;
    }
}