class BadPathError extends Error {

  constructor(message) {
    super(message);
    this.name = "Bad Path";
  }
}

module.exports = BadPathError;
