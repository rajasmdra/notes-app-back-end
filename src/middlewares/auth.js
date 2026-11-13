/* eslint-disable linebreak-style */
/* eslint-disable indent */
import TokenManager from '../security/token-manajer.js';
import response from '../utils/response.js';

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const user = await TokenManager.verify(token, process.env.ACCESS_TOKEN_KEY);
            req.user = user;
            return next();
        } catch (error) {
            return response(res, 401, error.message, null);
        }
    }

    return response(res, 401, 'Unauthorized', null);
};

export default authenticateToken;