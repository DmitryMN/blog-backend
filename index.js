import express from 'express';
import { sequelize } from './db/db.js';
import syncDB from './db/syncDB.js';
import { registrValidation, loginValidation } from './validation/auth.js';
import { postCreateValidation } from './validation/posts.js';
import { authController } from './auth/auth.controller.js';
import checkAuth from './utils/checkAuth.js';
import { postsController } from './posts/posts.controller.js';


const PORT = 4444


syncDB(sequelize);

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello')
});

app.post('/auth/registration', registrValidation, authController.registration);
app.post('/auth/login', authController.login);
app.get('/auth/me', checkAuth, authController.me);

app.post('/posts', checkAuth, postCreateValidation, postsController.createPost);
app.get('/posts', postsController.getAllpost);
app.get('/posts/:id', postsController.getOnePost);

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`server start on port ${PORT}`);
});