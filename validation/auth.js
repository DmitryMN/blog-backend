import { body } from "express-validator";

export const registrValidation = [
    body('email', 'неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 8 символов').isLength({min: 8}),
    body('fullName', 'укажите имя').isLength({min: 3}),
    body('avatrUrl', 'неверная ссылка на аватарку').optional().isURL(),
]