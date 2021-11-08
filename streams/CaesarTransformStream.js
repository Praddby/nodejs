const { Transform } = require('stream');

class CaesarTransformStream extends Transform {
  constructor(action) {
    super();
    this._action = action;
  }

  letterPlus = (start, end, current) => {
    const tempEl = current === end ? start : ++current;
    return String.fromCodePoint(tempEl);
  }

  letterMinus = (start, end, current) => {
    const tempEl = current === start ? end : --current;
    return String.fromCodePoint(tempEl);
  }

  encode = (msg) => {
    return msg.split('').map(el => {
      const codeEl = el.codePointAt(0);
      if (codeEl >= 65 && codeEl <= 90) {
        return this.letterPlus(65, 90, codeEl);
      } else if (codeEl >= 97 && codeEl <= 122) {
        return this.letterPlus(97, 122, codeEl);
      }
      return el;
    }).join('');
  }

  decode = (msg) => {
    return msg.split('').map(el => {
      const codeEl = el.codePointAt(0);
      if (codeEl >= 65 && codeEl <= 90) {
        return this.letterMinus(65, 90, codeEl);
      } else if (codeEl >= 97 && codeEl <= 122) {
        return this.letterMinus(97, 122, codeEl);
      }
      return el;
    }).join('');
  }

  _transform(chunk, _, callback) {
    try {
      const resultString = this._action === 1 ? this.encode(chunk.toString('utf8')) : this.decode(chunk.toString('utf8'));
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

module.exports = CaesarTransformStream;
