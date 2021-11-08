class BadValidationError extends Error {

  constructor(message) {
    super(message);
    this.name = "Bad validation";
  }
}

module.exports = BadValidationError;
