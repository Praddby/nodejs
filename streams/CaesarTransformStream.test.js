const CaesarTransformStream = require("./CaesarTransformStream");

describe("Transform stream: testing Caesar transform", () => {

  let caesar = new CaesarTransformStream();
  const encodeMsg = "ABCabc123";
  const resultMsg = "BCDbcd123";

  test("should difined method encode", () => {
    expect(caesar.encode).toBeDefined();
  });

  test("should return the correct encoding string", () => {
    expect(caesar.encode(encodeMsg)).toBe(resultMsg);
  });

  test("should difined method decode", () => {
    expect(caesar.decode).toBeDefined();
  });

  test("should return the correct decoding string", () => {
    expect(caesar.decode(resultMsg)).toBe(encodeMsg);
  });

  test("should difined method _transform", () => {
    expect(caesar._transform).toBeDefined();
  });
});
