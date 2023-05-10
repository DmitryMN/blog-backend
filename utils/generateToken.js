import jwt from 'jsonwebtoken';

export const generateToken = async (user) => {
    const payload = {
        id: user.id,
        email: user.email,
    }

    return {
        token: jwt.sign(payload, 'secret123', { expiresIn: '30d' })
    }
}