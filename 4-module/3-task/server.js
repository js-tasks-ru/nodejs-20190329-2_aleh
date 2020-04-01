const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'DELETE':
      if (pathHasNestedFolders(pathname)) {
        res.statusCode = 400;
        res.end('Nested folders are not supported!');
        return;
      }
      if (!fs.existsSync(filepath)) {
        res.statusCode = 404;
        res.end('File not found!');
        return;
      }
      deleteFile(filepath, res);
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;

function pathHasNestedFolders(filepath) {
  return /\/|\.\.|\\/g.test(filepath);
}

function deleteFile(filepath, res) {
  try {
    fs.unlink(filepath, (err) => {
      if (err) {
        internalServerError();
      } else {
        res.end('SUCCESS!');
      }
    })
  } catch (e) {
    internalServerError(res);
  }
}

function internalServerError(res) {
  res.statusCode = 500;
  res.end('Internal server error.');
}