const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    const { limit = 0, readableObjectMode = false } = options;
    this.isObjectMode = readableObjectMode;
    this.limit = limit;
    this.size = 0;
  }

  _transform(chunk, encoding, callback) {
    this.size += this.isObjectMode ? 1 : chunk.toString().length;
    if (this.size > this.limit) {
      callback(new LimitExceededError());
    } else {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
