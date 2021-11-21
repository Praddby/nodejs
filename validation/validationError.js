const { isDuplicateOption, isDir } = require("../helpers");
const {
  NotFoundError,
  DuplicateError,
  BadPathError,
  BadValidationError,
} = require("../errors");
const validationConfig = require("./validationConfig");

const validationError = (obj) => {
  if (!obj.configs) {
    throw new NotFoundError("Missing '-c' or '--config' option!")
  } else if (!obj.nameConfig) {
    throw new NotFoundError("Missing value for '-c' or '--config' option!");
  } else if (obj.inputs && !obj.nameInput) {
    throw new NotFoundError("Missing value for '-i' or '--input' option!");
  } else if (obj.outputs && !obj.nameOutput) {
    throw new NotFoundError("Missing value for '-o' or '--output' option!");
  } else if (isDuplicateOption(obj.configs)) {
    throw new DuplicateError("Duplicated config option!");
  } else if (obj.inputs && isDuplicateOption(obj.inputs)) {
    throw new DuplicateError("Duplicated input option!");
  } else if (obj.outputs && isDuplicateOption(obj.outputs)) {
    throw new DuplicateError("Duplicated output option!");
  } else if (obj.nameInput && isDir(obj.nameInput)) {
    throw new BadPathError(`${obj.nameInput} is directory, but need file!`);
  } else if (obj.nameOutput && isDir(obj.nameOutput)) {
    throw new BadPathError(`${obj.nameOutput} is directory, but need file!`);
  } else if (!validationConfig(obj.nameConfig)) {
    throw new BadValidationError(`This config "${obj.nameConfig}" is invalid!`);
  }
};

module.exports = validationError;
