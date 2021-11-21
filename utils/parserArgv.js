const { entryArgv, nameOption } = require("../helpers");


const argv = process.argv.slice(2);

const configs = entryArgv(argv, "-c", "--config");
const inputs = entryArgv(argv, "-i", "--input");
const outputs = entryArgv(argv, "-o", "--output");

const nameConfig = configs && nameOption(argv, configs);
const nameInput = inputs && nameOption(argv, inputs);
const nameOutput = outputs && nameOption(argv, outputs);

module.exports = {
  configs,
  inputs,
  outputs,
  nameConfig,
  nameInput,
  nameOutput,
};
