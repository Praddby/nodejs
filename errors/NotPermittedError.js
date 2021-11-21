class NotPermittedError extends Error {

  constructor(message) {
    super(message);
    this.name = "Operation not permitted";
  }
}

module.exports = NotPermittedError;
