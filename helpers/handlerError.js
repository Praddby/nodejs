const handlerError = (err) => {
  process.stderr.write(`${err}`);
  process.exit(1);
};

module.exports = handlerError;