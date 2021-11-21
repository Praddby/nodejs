class NotFoundError extends Error {

  constructor() {
    super();
    this.name = "Mock: Not found config or options";
  }
}

module.exports = NotFoundError;
