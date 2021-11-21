class DuplicateError extends Error {

  constructor() {
    super();
    this.name = "Mock: Duplicate options";
  }
}

module.exports = DuplicateError;
