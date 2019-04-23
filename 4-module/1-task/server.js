const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const stream = require('stream');

const handleError = require('./error-handler');

const server = new http.Server();

const FilesDirName = path.join(__dirname, 'files');

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);
  const filepath = path.join(FilesDirName, pathname);

  switch (req.method) {
    case 'GET':
      getFileSafe(filepath, res);
      break;

    default:
      handleError(501, res);
  }
});

module.exports = server;

function getFileSafe(filepath, res) {
    if (~filepath.indexOf('\0')) {
        handleError(500, res);
        return;
    }
    if (path.dirname(filepath) !== FilesDirName) {
        handleError(400, res);
        return;
    }
    if (!fs.existsSync(filepath)) {
        handleError(404, res);
        return;
    }
    getFile(filepath, res);
}

function getFile(filepath, res) {
    const file = fs.createReadStream(filepath);
    stream.pipeline(file, res, (err) => {
        if (err) {
            handleError(500, res);
            return;
        }
    });
}
