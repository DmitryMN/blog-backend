import express from 'express';
import jwt from 'jsonwebtoken';
import { sequelize } from './db/db.js';
import { Users } from './users/users.model.js';
import { registrValidation } from './validation/auth.js';
import { validationResult } from 'express-validator/src/validation-result.js';

const PORT = 4444

try {
    await sequelize.authenticate()
    console.log('Соединение с БД было успешно установлено')
} catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e)
}



const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello')
});

app.post('/auth/registration', registrValidation, (req, res) => {
    const resultError = validationResult(req);

    if(!resultError.isEmpty()) {
        return res.status(400).json(resultError.array());
    }

    res.json({
        success: true
    })
});

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`server start on port ${PORT}`);
})