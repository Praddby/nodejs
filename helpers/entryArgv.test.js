const entryArgv = require("./entryArgv");

let optionDefault;
let shorts;
let longs;
let argvShort;
let argvLong;

beforeEach(() => {
  optionDefault = {
    shortIdx: null,
    shortLastIdx: null,
    idx: null,
    lastIdx: null
  };
  argvShort = ["-c", "A-R0-C1", "-i", "./input.txt", "-o", "./output.txt"];
  argvLong = ["--config", "A-R0-C1", "--input", "./input.txt", "--output", "./output.txt"];
  shorts = ["-c", "-i", "-o"];
  longs = ["--config", "--input", "--output"];
});


describe("Helpers: testing entry argv function", () => {
  test("should return null, if not found options", () => {
    shorts.forEach((el, index) => {
      expect(entryArgv([], el, longs[index])).toBeNull();
    });
  });

  test("should return object for short options", () => {
    shorts.forEach((el, index) => {
      optionDefault.shortIdx = index * 2;
      optionDefault.shortLastIdx = index * 2;
      expect(entryArgv(argvShort, el, longs[index])).toEqual(optionDefault);
    })
  });

  test("should return object for long options", () => {
    longs.forEach((el, index) => {
      optionDefault.idx = index * 2;
      optionDefault.lastIdx = index * 2;
      expect(entryArgv(argvLong, shorts[index], el)).toEqual(optionDefault);
    })
  });

  test("should return object for duplicate short options", () => {
    shorts.forEach((el, index) => {
      const number = argvShort.push(el);
      optionDefault.shortIdx = index * 2;
      optionDefault.shortLastIdx = number - 1;
      expect(entryArgv(argvShort, el, longs[index])).toEqual(optionDefault);
    });
  });

  test("should return object for duplicate long options", () => {
    longs.forEach((el, index) => {
      const number = argvLong.push(el);
      optionDefault.idx = index * 2;
      optionDefault.lastIdx = number - 1;
      expect(entryArgv(argvLong, shorts[index], el)).toEqual(optionDefault);
    });
  });
});
