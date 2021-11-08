const { Writable } = require('stream');
const fs = require('fs');
const path = require('path');

class MyWriteStream extends Writable {
  constructor(path, opt) {
    super(opt);
    this._path = path;
  }

  handlerError() {
    process.stderr.write(`Operation not permitted: Can't write file "${path.basename(this._path)}"!`);
    process.exit(1);
  }

  _write(chunk, _, callback) {
    fs.open(this._path, "a+", (err, fd) => {
      if (err) {
        this.handlerError();
      }
      fs.write(fd, chunk.toString(), (err) => {
        if (err) {
          this.handlerError();
        }
      })
    });
    callback();
  }
}

module.exports = MyWriteStream;
