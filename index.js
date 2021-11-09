const path = require("path");
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
const fileForRead = inputs && path.join(__dirname, nameOption(argv, inputs));
const fileForWrite = outputs && path.join(__dirname, nameOption(argv, outputs));

try {
  if (!configs) {
    throw new NotFoundError("Missing '-c' or '--config' option!")
  } else if (configs && isDuplicateOption(configs)) {
    throw new DuplicateError("Duplicated config option!");
  } else if (inputs && isDuplicateOption(inputs)) {
    throw new DuplicateError("Duplicated input option!");
  } else if (outputs && isDuplicateOption(outputs)) {
    throw new DuplicateError("Duplicated output option!");
  } else if (fileForRead && isDir(fileForRead)) {
    throw new BadPathError(`${fileForRead} is directory, but need file!`);
  } else if (fileForWrite && isDir(fileForWrite)) {
    throw new BadPathError(`${fileForWrite} is directory, but need file!`);
  } else if (!validationConfig(config)) {
    throw new BadValidationError(`This config "${config}" is invalid!`);
  }
} catch (err) {
  handlerError(err);
}

const arrTransform = parserConfig(config);
const read = inputs ? new MyReadStream(fileForRead) : process.stdin;
const write = outputs ? new MyWriteStream(fileForWrite) : process.stdout;

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
