class BadValidationError extends Error {

  constructor() {
    super();
    this.name = "Mock: Bad validation";
  }
}

module.exports = BadValidationError;
