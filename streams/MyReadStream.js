const { Readable } = require('stream');
const fs = require('fs');
const path = require('path');
const { NotPermittedError } = require('../errors');

class MyReadStream extends Readable {
  constructor(path, opt) {
    super(opt);
    this._path = path;
    this._fd = null;
    this._sizeFile = 0;
    this._start = 0;
  }

  _construct(callback) {
    fs.open(this._path, "r+", (err, fd) => {
      if (err) {
        callback(err);
      }
      this._fd = fd;
      fs.stat(this._path, (err, stats) => {
        if (err) {
          callback(err);
        }
        this._sizeFile = stats.size;
        callback();
      });
    });
  }

  async _read(size) {
    const readSize = this._sizeFile < size ? this._sizeFile : size;
    let buff = Buffer.alloc(readSize);
    if (this._sizeFile > 0) {
      fs.read(this._fd, buff, 0, readSize, this._start, (err, _) => {
        if (err) {
          callback(new NotPermittedError(`Can't read file "${path.basename(this._path)}"!`));
        }
        this.push(buff.toString());
      });
      this._sizeFile -= readSize;
      this._start = readSize;
    } else {
      fs.close(this._fd);
    }
  }
}

module.exports = MyReadStream;
