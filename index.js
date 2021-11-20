const { pipeline } = require("stream");
const { parserConfig, handlerError } = require("./helpers");
const { MyReadStream, MyWriteStream } = require("./streams");
const { validationError } = require("./validation");
const {
  inputs,
  outputs,
  nameConfig,
  nameInput,
  nameOutput,
} = require("./utils/parserArgv");

try {
  validationError();
} catch (err) {
  handlerError(err);
}

const read = inputs ? new MyReadStream(nameInput) : process.stdin;
const write = outputs ? new MyWriteStream(nameOutput) : process.stdout;
const arrTransform = parserConfig(nameConfig);

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
