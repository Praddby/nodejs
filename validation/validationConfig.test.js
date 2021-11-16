const validationConfig = require("./validationConfig");

const valid_configs = [
  "A-C0-C1-R0-R1",
  "A",
  "R1-C0",
  "A-C1",
  "R0"
];
const invalid_configs = [
  "a-C0",
  "A1-C0",
  "-A-C0",
  "A--C0",
  "A-C2",
  "A-",
  "asdasd",
  "123",
  "null"
];
describe("Testing validation function", () => {
  test("should return false, if typeof str != string", () => {
    expect(validationConfig([])).toBeFalsy();
    expect(validationConfig({})).toBeFalsy();
    expect(validationConfig(1)).toBeFalsy();
    expect(validationConfig(null)).toBeFalsy();
  });

  test("should return false, if lenght str = 0", () => {
    expect(validationConfig("")).toBeFalsy();
  });

  test("should return false, if config invalid", () => {
    invalid_configs.forEach(c => {
      expect(validationConfig(c)).toBeFalsy();
    })
  });

  test("should return true, if config valid", () => {
    valid_configs.forEach(c => {
      expect(validationConfig(c)).toBeTruthy();
    })
  });
});