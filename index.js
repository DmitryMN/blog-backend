import express from 'express';
import { sequelize } from './db/db.js';
import { registrValidation } from './validation/auth.js';
import { authController } from './auth/auth.controller.js';


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

app.post('/auth/registration', registrValidation, authController.registration);

app.post('/auth/login', authController.login);

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`server start on port ${PORT}`);
});