import jwt from 'jsonwebtoken';

export default (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(403).json({
            message: 'Нет доступа'
        });
    }

    const token = (authHeader || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const user = jwt.verify(token, 'secret123');
            req.id = user.id;
            next();
        } catch (e) {
            return res.status(403).json({
                message: 'Нет доступа'
            })
        }
    }
}