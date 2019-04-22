const stream = require('stream');
const { EOL } = require('os');

class LineSplitStream extends stream.Transform {
    constructor(options) {
        super(options);
        // buffer to save last part of data
        this.currentBuffer = [];
    }

    _transform(chunk, encoding, callback) {
        // split all chunk data by `EOL` symbol
        const messagesList = chunk.toString().split(EOL);

        // TODO: Do we need this block?
        if (messagesList.length < 1) {
            callback();
            return;
        }
        // push first part of data to current buffer and remove it from messages list
        this.currentBuffer.push(messagesList.shift());

        // if new message had EOL symbol = send all buffered data
        if (messagesList.length) {
            this._sendAndEmptyCurrentBuffer();
            this.currentBuffer.push(messagesList.pop());
            messagesList.forEach((message) => this.push(message));
        }
        callback();
    }

    _flush(callback) {
        if (this.currentBuffer.length) {
            this._sendAndEmptyCurrentBuffer();
        }
        callback();
    }

    _sendAndEmptyCurrentBuffer() {
        this.push(this.currentBuffer.join(''))
        this.currentBuffer.length = 0;
    }
}

module.exports = LineSplitStream;
