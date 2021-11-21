const { pipeline } = require("stream");
const { parserConfig, handlerError } = require("./helpers");
const { MyReadStream, MyWriteStream } = require("./streams");
const { validationError } = require("./validation");
const obj = require("./utils/parserArgv");

try {
  validationError(obj);
} catch (err) {
  handlerError(err);
}

const read = obj.inputs ? new MyReadStream(obj.nameInput) : process.stdin;
const write = obj.outputs ? new MyWriteStream(obj.nameOutput) : process.stdout;
const arrTransform = parserConfig(obj.nameConfig);

pipeline(
  read,
  ...arrTransform,
  write,
  (err) => {
    if (err) {
      handlerError(err);
    }
  }
);

process.on('SIGINT', () => process.exit(0));
