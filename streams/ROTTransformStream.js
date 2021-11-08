const { Transform } = require('stream');

class ROTTransformStream extends Transform {
  constructor(action) {
    super();
    this._shift = 8;
    this._action = action;
  }

  letterPlus = (start, end, current, shift) => {
    let tempEl = current;
    for (let i = 0; i < shift; i++) {
      tempEl === end ? tempEl = start : tempEl++;
    }
    return String.fromCodePoint(tempEl);
  }

  letterMinus = (start, end, current, shift) => {
    let tempEl = current;
    for (let i = 0; i < shift; i++) {
      tempEl === start ? tempEl = end : tempEl--
    }
    return String.fromCodePoint(tempEl);
  }

  encode = (msg, shift) => {
    return msg.split('').map(el => {
      const codeEl = el.codePointAt(0);
      if (codeEl >= 65 && codeEl <= 90) {
        return this.letterPlus(65, 90, codeEl, shift);
      } else if (codeEl >= 97 && codeEl <= 122) {
        return this.letterPlus(97, 122, codeEl, shift);
      }
      return el;
    }).join('');
  }

  decode = (msg, shift) => {
    return msg.split('').map(el => {
      const codeEl = el.codePointAt(0);
      if (codeEl >= 65 && codeEl <= 90) {
        return this.letterMinus(65, 90, codeEl, shift);
      } else if (codeEl >= 97 && codeEl <= 122) {
        return this.letterMinus(97, 122, codeEl, shift);
      }
      return el;
    }).join('');
  }

  _transform(chunk, _, callback) {
    try {
      const resultString = this._action === 1 ? this.encode(chunk.toString('utf8'), this._shift) : this.decode(chunk.toString('utf8'), this._shift);
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

module.exports = ROTTransformStream;
