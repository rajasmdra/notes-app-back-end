/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';
import InvariantError from '../exceptions/invariant-error.js';
import AuthenticationError from '../exceptions/authentication-error.js';

const TokenManager = {
    generateAccessToken: (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_KEY),
    generateRefreshToken: (payload) => jwt.sign(payload, process.env.REFRESH_TOKEN_KEY),
    verifyRefreshToken: (refreshToken) => {
        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
            return payload;
        } catch (error) {
            throw new InvariantError('Refresh token tidak valid');
        }
    },
    verify: (accessToken, secret = process.env.ACCESS_TOKEN_KEY) => {
        try {
            const payload = jwt.verify(accessToken, secret);
            return payload;
        } catch (error) {
            throw new AuthenticationError('Access token tidak valid');
        }
    },
};

export default TokenManager;