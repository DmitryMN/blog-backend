import { postService } from "./post.service.js";
import { validationResult } from 'express-validator';

export const postsController = {
    async createPost(req, res) {
        try {
            const resultError = validationResult(req);

            if (!resultError.isEmpty()) {
                return res.status(400).json(resultError.array());
            }

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

        } catch (e) {
            res.status(500).json({
                message: 'Не удалось создать статью'
            })
        }
    },

    async getAllpost(req, res) {
        try {

            const getPosts = await postService.getAllPost();

            if (!getPosts) {
                return res.status(400).json({
                    message: 'Посты не найдены'
                });
            }

            res.status(200).json(getPosts);

        } catch (e) {
            res.status(500).json({
                message: 'Не удалось загрузить статьи'
            })
        }
    },

    async getOnePost(req, res) {
        try {
            const id = req.params.id;

            if (!id) {
                return res.status(404).json({
                    message: 'Неизвестный id'
                });
            }

            const post = await postService.getOnePost(id);

            if (!post) {
                return res.status(404).json({
                    message: 'Пост не существует'
                });
            }

            res.status(200).json({
                post
            });

        } catch (e) {
            res.status(500).json({
                message: 'Не удалось загрузить статью'
            })
        }
    },

    async removePost(req, res) {
        try {
            const id = req.params.id;

            if (!id) {
                return res.status(404).json({
                    message: 'Неизвестный id'
                });
            }

            const result = await postService.removePost(id);
            console.log('result: ' + result);
            res.status(200).json({
                succes: true
            });

        } catch (e) {
            res.status(500).json({
                message: 'Не удалось удалить пост'
            })
        }
    }
}