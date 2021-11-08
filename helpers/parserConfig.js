const {
  CaesarTransformStream,
  AtbashTransformStream,
  ROTTransformStream,
} = require("../streams");

const parserConfig = (str) => {
  return str.split("-").map(el => {
    switch(el[0]) {
      case "C": return new CaesarTransformStream(+el[1]);
      case "R": return new ROTTransformStream(+el[1]);
      case "A": return new AtbashTransformStream();
    }
  })
};

module.exports = parserConfig;
