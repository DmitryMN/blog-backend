import { postService } from "./post.service.js";

export const postsController = {
    async createPost(req, res) {
        try {

            const resultError = validationResult(req);

            if (!resultError.isEmpty()) {
                return res.status(400).json(resultError.array());
            }

            console.log('id: ' + req.id);
            
            const post = {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags,
                imageUrl: req.body.imageUrl || '',
                UserId: req.id
            }

            const newPost = await postService.createPost(post)

            res.status(200).json({
                succes: true,
                newPost
            })

        } catch(e) {
            res.status(500).json({
                message: 'Не удалось создать статью'
            })
        }
    },

    async getAllpost(req, res) {
        try {

            const getPosts = await postService.getAllPost();

            if(!getPosts) {
                return res.status(400).json({
                    message: 'Посты не найдены'
                });
            }

            res.status(200).json(getPosts);

        } catch(e) {
            res.status(500).json({
                message: 'Не удалось загрузить статьи'
            })
        }
    }
}