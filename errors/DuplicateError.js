class DuplicateError extends Error {

  constructor(message) {
    super(message);
    this.name = "Duplicate options";
  }
}

module.exports = DuplicateError;
