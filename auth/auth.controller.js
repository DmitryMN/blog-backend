import { userService } from '../users/users.service.js';
import * as bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';


export const authController = {
    async login(req, res) {
        try {

            const user = await userService.getUserByEmail(req.body.email);

            if (!user) {
                return res.status(400).json({
                    message: 'Неверный логин или пароль'
                });
            }

            const passwordEqual = await bcrypt.compare(req.body.password, user.dataValues.passwordHash);

            if (user && passwordEqual) {

                const token = await generateToken(user);

                return res.status(200).json({
                    success: true,
                    token: token.token
                });
            }

            res.status(400).json({
                message: 'Неверный логин или пароль'
            })

        } catch (err) {
            res.status(500).json({
                message: 'Не удалось авторизоваться'
            })
        }
    },

    async registration(req, res) {
        try {
            const resultError = validationResult(req);

            if (!resultError.isEmpty()) {
                return res.status(400).json(resultError.array());
            }

            const candidate = await userService.getUserByEmail(req.body.email);

            if (candidate) {
                return res.status(400).json({ message: 'Этот email уже зарегистрирован, введите другой email' });
            }

            const hashPassword = await bcrypt.hash(req.body.password, 5);

            const user = await userService.createUser({
                fullName: req.body.fullName,
                email: req.body.email,
                passwordHash: hashPassword,
                avatrUrl: req.body.avatrUrl || '',
            });

            const token = await generateToken(user.dataValues);

            res.status(200).json({
                success: true,
                token: token.token
            });

        } catch (err) {
            res.status(500).json({
                message: 'Не удалось зарегистрироваться'
            });
        }
    },

    async me(req, res) {
        try {

            const user = await userService.getUserByEmail(req.email)

            const {id, fullName, email, avatrUrl} = user.dataValues;


            if(!user) {
                return res.status(403).json({
                    message: 'Нет доступа'
                })
            }

            res.status(200).json({
                success: true,
                id,
                fullName,
                email,
                avatrUrl,
            });

        } catch (err) {
            res.status(500).json({
                message: 'Не удалось загрузить профиль'
            });
        }
    }
}