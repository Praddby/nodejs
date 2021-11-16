const { pipeline } = require("stream");
const {
  entryArgv,
  isDuplicateOption,
  nameOption,
  isDir,
  parserConfig,
  handlerError,
} = require("./helpers");
const { MyReadStream, MyWriteStream } = require("./streams");
const {
  NotFoundError,
  DuplicateError,
  BadPathError,
  BadValidationError,
} = require("./errors");
const { validationConfig } = require("./validation");

const argv = process.argv.slice(2);

const configs = entryArgv(argv, "-c", "--config");
const inputs = entryArgv(argv, "-i", "--input");
const outputs = entryArgv(argv, "-o", "--output");

const config = configs && nameOption(argv, configs);
const nameInput = inputs && nameOption(argv, inputs);
const nameOutput = outputs && nameOption(argv, outputs);

try {
  if (!configs) {
    throw new NotFoundError("Missing '-c' or '--config' option!")
  } else if (!config) {
    throw new NotFoundError("Missing value for '-c' or '--config' option!");
  } else if (inputs && !nameInput) {
    throw new NotFoundError("Missing value for '-i' or '--input' option!");
  } else if (outputs && !nameOutput) {
    throw new NotFoundError("Missing value for '-o' or '--output' option!");
  } else if (isDuplicateOption(configs)) {
    throw new DuplicateError("Duplicated config option!");
  } else if (inputs && isDuplicateOption(inputs)) {
    throw new DuplicateError("Duplicated input option!");
  } else if (outputs && isDuplicateOption(outputs)) {
    throw new DuplicateError("Duplicated output option!");
  } else if (nameInput && isDir(nameInput)) {
    throw new BadPathError(`${nameInput} is directory, but need file!`);
  } else if (nameOutput && isDir(nameOutput)) {
    throw new BadPathError(`${nameOutput} is directory, but need file!`);
  } else if (!validationConfig(config)) {
    throw new BadValidationError(`This config "${config}" is invalid!`);
  }
} catch (err) {
  handlerError(err);
}

const read = inputs ? new MyReadStream(nameInput) : process.stdin;
const write = outputs ? new MyWriteStream(nameOutput) : process.stdout;
const arrTransform = parserConfig(config);

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
