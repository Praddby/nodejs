const { Readable } = require('stream');
const fs = require('fs');
const path = require('path');

class MyReadStream extends Readable {
  constructor(path, opt) {
    super(opt);
    this._path = path;
  }

  _construct(callback) {
    fs.stat(this._path, (err, stats) => {
      if (err) {
        this.handlerError();
      }
      this._sizeFile = stats.size;
    })
    this._start = 0;
    callback();
  }

  handlerError() {
    process.stderr.write(`Operation not permitted: Can't read file "${path.basename(this._path)}"!`);
    process.exit(1);
  }

  async _read(size) {
    fs.open(this._path, "r+", (err, fd) => {
      if (err) {
        this.handlerError();
      }
      const readSize = this._sizeFile < size ? this._sizeFile : size;
      let buff = Buffer.alloc(readSize);
      if (this._sizeFile > 0) {
        fs.read(fd, buff, 0, readSize, this._start, (err, _) => {
          if (err) {
            this.handlerError();
          }
          this.push(buff.toString());
        });
        this._sizeFile -= readSize;
        this._start = readSize;
      } else {
        fs.close(fd);
      }
    });
  }
}

module.exports = MyReadStream;
