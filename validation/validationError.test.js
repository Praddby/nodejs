const validationError = require("./validationError");
const isDir = require("../helpers/isDir");
const isDuplicateOption = require("../helpers/isDuplicateOption");
const validationConfig = require("../validation/validationConfig");
const {
  NotFoundError,
  DuplicateError,
  BadPathError,
  BadValidationError,
} = require("../errors");

jest.mock("../errors/NotFoundError");
jest.mock("../errors/DuplicateError");
jest.mock("../errors/BadPathError");
jest.mock("../errors/BadValidationError");

jest.mock("../helpers/isDir", () => jest.fn());
jest.mock("../helpers/isDuplicateOption", () => jest.fn());
jest.mock("../validation/validationConfig", () => jest.fn());

describe("Testing validation errors function", () => {
  let obj = {};

  beforeEach(() => {
    obj = {
      configs: null,
      inputs: null,
      outputs: null,
      nameConfig: null,
      nameInput: null,
      nameOutput: null,
    };
    isDuplicateOption.mockImplementation(() => false);
    isDir.mockImplementation(() => false);
    validationConfig.mockImplementation(() => true);
  });

  test("should throw NotFoundError for config", () => {
    try{
      validationError(obj);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundError);
      expect(`${err}`).toBe("Mock: Not found config or options");
    }
  });

  test("should throw NotFoundError, not value for config", () => {
    obj.configs = { shortIdx: 0, shortLastIdx: 0, idx: null, lastIdx: null };
    
    try{
      validationError(obj);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundError);
      expect(`${err}`).toBe("Mock: Not found config or options");
    }
  });

  test("should throw NotFoundError, not value for input", () => {
    obj.configs = { shortIdx: 0, shortLastIdx: 0, idx: null, lastIdx: null };
    obj.inputs = { shortIdx: 2, shortLastIdx: 2, idx: null, lastIdx: null };
    obj.nameConfig = "A-C1-R0";
    
    try{
      validationError(obj);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundError);
      expect(`${err}`).toBe("Mock: Not found config or options");
    }
  });

  test("should throw NotFoundError, not value for output", () => {
    obj.configs = { shortIdx: 0, shortLastIdx: 0, idx: null, lastIdx: null };
    obj.inputs = { shortIdx: 2, shortLastIdx: 2, idx: null, lastIdx: null };
    obj.outputs = { shortIdx: 4, shortLastIdx: 4, idx: null, lastIdx: null };
    obj.nameConfig = "A-C1-R0";
    obj.nameInput = "./inputFile.txt";
    
    try{
      validationError(obj);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundError);
      expect(`${err}`).toBe("Mock: Not found config or options");
    }
  });

  test("should throw DuplicateError options", () => {
    obj.configs = { shortIdx: 0, shortLastIdx: 2, idx: null, lastIdx: null };
    obj.nameConfig = "A-C1-R0";
    obj.inputs = { shortIdx: 4, shortLastIdx: 6, idx: null, lastIdx: null };
    obj.nameInput = "./inputFile.txt";
    obj.outputs = { shortIdx: 8, shortLastIdx: 10, idx: null, lastIdx: null };
    obj.nameOutput = "./outputFile.txt";
    isDuplicateOption.mockImplementation(() => true);

    try{
      validationError(obj);
    } catch (err) {
      expect(err).toBeInstanceOf(DuplicateError);
      expect(`${err}`).toBe("Mock: Duplicate options");
    }
  });

  test("should throw BadPathError for input", () => {
    obj.configs = { shortIdx: 0, shortLastIdx: 0, idx: null, lastIdx: null };
    obj.nameConfig = "A-C1-R0";
    obj.nameInput = "./inputFile.txt";
    isDir.mockImplementation(() => true);

    try{
      validationError(obj);
    } catch (err) {
      expect(err).toBeInstanceOf(BadPathError);
      expect(`${err}`).toBe("Mock: Bad Path");
    }
  });

  test("should throw BadPathError for output", () => {
    obj.configs = { shortIdx: 0, shortLastIdx: 0, idx: null, lastIdx: null };
    obj.nameConfig = "A-C1-R0";
    obj.nameOutput = "./outputFile.txt";
    isDir.mockImplementation(() => true);

    try{
      validationError(obj);
    } catch (err) {
      expect(err).toBeInstanceOf(BadPathError);
      expect(`${err}`).toBe("Mock: Bad Path");
    }
  });

  test("should throw BadValidationError for config", () => {
    obj.configs = { shortIdx: 0, shortLastIdx: 0, idx: null, lastIdx: null };
    obj.nameConfig = "A-C1-R0";
    validationConfig.mockImplementation(() => false);

    try{
      validationError(obj);
    } catch (err) {
      expect(err).toBeInstanceOf(BadValidationError);
      expect(`${err}`).toBe("Mock: Bad validation");
    }
  });
});
