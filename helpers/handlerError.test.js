const handlerError = require("./handlerError");

describe("Helpers: testing handler error function", () => {
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
  const ERROR_CODE = 1;
  const mstError = "Custom error";

  test("should return null, if not found options", () => {
    handlerError(mstError);
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE);
  });
});
