class NotFoundError extends Error {

  constructor(message) {
    super(message);
    this.name = "Not found config";
  }
}

module.exports = NotFoundError;
