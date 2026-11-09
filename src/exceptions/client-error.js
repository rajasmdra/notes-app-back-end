/* eslint-disable linebreak-style */
/* eslint-disable indent */

class ClientError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.name = 'clientError';
        this.statusCode = statusCode;
    }
}

export default ClientError;