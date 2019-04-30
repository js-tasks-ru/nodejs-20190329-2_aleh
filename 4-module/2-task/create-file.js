/* eslint-disable */
const fs = require('fs');
const { pipeline } = require('stream');
const LimitSizeStream = require('./LimitSizeStream');
const LimitExceededError = require('./LimitExceededError');

module.exports = function createFile(filename, req, res) {
    const limitStream = new LimitSizeStream({ limit: 1e6 }),
        newFile = fs.createWriteStream(filename);

    req
        .on('aborted', () => {
            removeFile(filename);
        })
        .pipe(limitStream)
        .on('error', (err) => {
            if (err instanceof LimitExceededError) {
                handleError(res, 413);
                removeFile(filename);
                return;
            }
            handleError(res, 500);
        })
        .pipe(newFile)
        .on('error', (err) => {
            handleError(res, 500);
        })
        .on('finish', () => {
            res.statusCode = 201;
            res.end('Created');
        });
};

function removeFile(filename) {
    fs.unlink(filename, (err) => {})
}

function handleError(response, errorCode = 500) {
    response.statusCode = errorCode;
    switch (errorCode) {
        case 400:
            response.end('Bad request!');
            break;
        case 404:
            response.end('File not found!');
            break;
        case 409:
            response.end('File already exists!');
            break;
        case 413:
            response.end('File size exceeded!');
            break;
        case 500:
            response.end('You need to provide the secret code!');
            break;
        case 501:
            response.end('Not implemented');
            break;
    }
};
