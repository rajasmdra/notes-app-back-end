/* eslint-disable linebreak-style */
/* eslint-disable indent */
import ClientError from './client-error.js';

class AuthenticationError extends ClientError {
    constructor(message) {
        super(message, 401);
        this.name = 'AuthenticationError';
    }
}

export default AuthenticationError;