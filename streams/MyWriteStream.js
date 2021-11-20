const { Writable } = require('stream');
const fs = require('fs');
const path = require('path');
const { NotPermittedError } = require('../errors');

class MyWriteStream extends Writable {
  constructor(path, opt) {
    super(opt);
    this._path = path;
    this._fd = null;
  }

  _construct(callback) {
    fs.open(this._path, "a+", (err, fd) => {
      if (err) {
        callback(err);
      }
      this._fd = fd;
      callback();
    });
  }

  _write(chunk, _, callback) {
    fs.write(this._fd, chunk.toString(), (err) => {
      if (err) {
        callback(new NotPermittedError(`Can't write file "${path.basename(this._path)}"!`));
      }
    })
    callback();
  }
}

module.exports = MyWriteStream;
