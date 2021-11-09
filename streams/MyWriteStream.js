const { Writable } = require('stream');
const fs = require('fs');
const path = require('path');

class MyWriteStream extends Writable {
  constructor(path, opt) {
    super(opt);
    this._path = path;
  }

  _construct(callback) {
    fs.open(this._path, "a+", (err, fd) => {
      if (err) {
        this.handlerError();
      }
      this._fd = fd;
      callback();
    });
  }

  handlerError() {
    process.stderr.write(`Operation not permitted: Can't write file "${path.basename(this._path)}"!`);
    process.exit(1);
  }

  _write(chunk, _, callback) {
    fs.write(this._fd, chunk.toString(), (err) => {
      if (err) {
        this.handlerError();
      }
    })
    callback();
  }
}

module.exports = MyWriteStream;
