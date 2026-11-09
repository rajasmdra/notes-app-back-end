/* eslint-disable linebreak-style */
/* eslint-disable indent */
const response = (res, statusCode, message, data) => {
    return res
        .statusCode
        .json({
            code: statusCode,
            status: statusCode < 400 ? 'success' : 'failed',
            message,
            data,
        })
        .end();
};

export default response;