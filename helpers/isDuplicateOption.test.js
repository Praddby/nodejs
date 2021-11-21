const isDuplicateOption = require("./isDuplicateOption");

let optionDefault;

beforeEach(() => {
  optionDefault = {
    shortIdx: null,
    shortLastIdx: null,
    idx: null,
    lastIdx: null
  };
});


describe("Helpers: testing duplicate options function", () => {
  test("should return false, if don't have duplicate options", () => {
    optionDefault.shortIdx = 0;
    optionDefault.shortLastIdx = 0;
    expect(isDuplicateOption(optionDefault)).toBeFalsy();
  });

  test("should return false, if don't have duplicate options", () => {
    optionDefault.idx = 0;
    optionDefault.lastIdx = 0;
    expect(isDuplicateOption(optionDefault)).toBeFalsy();
  });

  test("should return true, if have duplicate options", () => {
    optionDefault.idx = 0;
    optionDefault.lastIdx = 2;
    expect(isDuplicateOption(optionDefault)).toBeTruthy();
  });

  test("should return true, if have duplicate options", () => {
    optionDefault.shortIdx = 0;
    optionDefault.shortLastIdx = 2;
    expect(isDuplicateOption(optionDefault)).toBeTruthy();
  });

  test("should return true, if have duplicate options", () => {
    optionDefault.shortIdx = 0;
    optionDefault.idx = 2;
    expect(isDuplicateOption(optionDefault)).toBeTruthy();
  });
});
