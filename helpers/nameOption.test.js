const nameOption = require("./nameOption");

let optionDefault;
let argvShort;

beforeEach(() => {
  optionDefault = {
    shortIdx: null,
    shortLastIdx: null,
    idx: null,
    lastIdx: null
  };
  argvShort = ["-c", "A-R0-C1", "-i", "./input.txt", "-o", "./output.txt"];
});


describe("Helpers: testing name option function", () => {
  test("should return correct name option", () => {
    for(let i = 0; i < 3; i++) {
      optionDefault.shortIdx = i * 2;
      expect(nameOption(argvShort, optionDefault)).toBe(argvShort[i * 2 + 1]);
    }
  });

  test("should return null, if name option incorrect", () => {
    for(let i = 0; i < 3; i++) {
      argvShort.splice(i + 1, 1);
      optionDefault.shortIdx = i;
      expect(nameOption(argvShort, optionDefault)).toBeNull();
    }
  });
});