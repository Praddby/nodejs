const { Transform } = require('stream');
const { alhabet } = require('../utils/alhabet.json');

class AtbashTransformStream extends Transform {
  constructor() {
    super();
    this._alhabet = alhabet;
  }

  encode = (msg) => {
    return msg.split('').map(el => {
      const codeEl = el.codePointAt(0);
      if (codeEl >= 65 && codeEl <= 90) {
        const index = this._alhabet.indexOf(el);
        return this._alhabet.reverse()[index];
      } else if (codeEl >= 97 && codeEl <= 122) {
        const index = this._alhabet.indexOf(el.toUpperCase());
        return this._alhabet.reverse()[index].toLowerCase();
      }
      return el;
    }).join('');
  }

  _transform(chunk, _, callback) {
    try {
      const resultString = this.encode(chunk.toString('utf8'));
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

module.exports = AtbashTransformStream;
