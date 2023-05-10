import jwt from 'jsonwebtoken';

export default (req, res, next) => {

    const authHeader = req.headers.authorization;

    const token = (authHeader || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const user = jwt.verify(token, 'secret123');
            req.email = user.email;
            next();
        } catch (e) {
            return res.status(403).json({
                message: 'Нет доступа'
            })
        }
    }
}