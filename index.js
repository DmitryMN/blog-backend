import express from 'express';
import jwt from 'jsonwebtoken';
import { sequelize } from './db/db.js';
import * as bcrypt from 'bcrypt'
import { registrValidation } from './validation/auth.js';
import { validationResult } from 'express-validator/src/validation-result.js';
import { userService } from './users/users.service.js';

const PORT = 4444

try {
    await sequelize.authenticate()
    console.log('Соединение с БД было успешно установлено')
} catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e)
}

const app = express();
app.use(express.json());

const generateToken = async (user) => {
    const payload = {
        id: user.id,
        email: user.email,
    }

    return {
        token: jwt.sign(payload, 'secret123', {expiresIn: '30d'})
    }
}

app.get('/', (req, res) => {
    res.send('hello')
});

app.post('/auth/registration', registrValidation, async (req, res) => {

    try {
        const resultError = validationResult(req);

        if(!resultError.isEmpty()) {
            return res.status(400).json(resultError.array());
        }
    
        const hashPassword = await bcrypt.hash(req.body.password, 5);

        const user = await userService.createUser({
            fullName: req.body.fullName,
            email: req.body.email,
            passwordHash: hashPassword,
            avatrUrl: req.body.avatrUrl || '',
        });

        if(!user) {
            throw new Error('Не удалось зарегистрироваться');
        }
        
        const token = await generateToken(user.dataValues);

        res.json({
            success: true,
            token: {...token}
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
          message: "Не удалось зарегистрироваться"  
        });
    }

});


app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`server start on port ${PORT}`);
})