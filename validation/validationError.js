const {
  isDuplicateOption,
  isDir,
  entryArgv,
  nameOption,
} = require("../helpers");
const {
  NotFoundError,
  DuplicateError,
  BadPathError,
  BadValidationError,
} = require("../errors");
const validationConfig = require("./validationConfig");

const {
  configs,
  inputs,
  outputs,
  nameConfig,
  nameInput,
  nameOutput,
} = require("../utils/parserArgv");

const validationError = () => {
  if (!configs) {
    throw new NotFoundError("Missing '-c' or '--config' option!")
  } else if (!nameConfig) {
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
  } else if (!validationConfig(nameConfig)) {
    throw new BadValidationError(`This config "${nameConfig}" is invalid!`);
  }
};

module.exports = validationError;