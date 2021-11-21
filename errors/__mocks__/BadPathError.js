class BadPathError extends Error {

  constructor() {
    super();
    this.name = "Mock: Bad Path";
  }
}

module.exports = BadPathError;
