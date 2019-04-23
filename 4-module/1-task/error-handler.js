module.exports = function handleError(errorCode = 500, response) {
    response.statusCode = errorCode;
    switch (errorCode) {
        case 400:
            response.end('Bad request!');
            break;
        case 404:
            response.end('File not found!');
            break;
        case 500:
            response.end('You need to provide the secret code!');
            break;
        case 501:
            response.end('Not implemented');
            break;
    }
};
