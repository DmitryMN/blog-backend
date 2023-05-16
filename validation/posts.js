import { body } from "express-validator";


export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({min: 3}).isString(),
    body('text', 'Введите текс статьи').isLength({min: 10}).isString(),
    body('tags', 'неверный формат тегов(укажите массив)').optional().isArray(),
    body('imageUrl', 'Неверная ссылка на изображения').optional().isString(),
]