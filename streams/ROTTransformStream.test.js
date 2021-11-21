const ROTTransformStream = require("./ROTTransformStream");

describe("Transform stream: testing ROT transform", () => {

  let ROT = new ROTTransformStream();
  const shift = 8;
  const encodeMsg = "ABCabc123";
  const resultMsg = "IJKijk123";

  test("should difined method encode", () => {
    expect(ROT.encode).toBeDefined();
  });

  test("should return the correct encoding string", () => {
    expect(ROT.encode(encodeMsg, shift)).toBe(resultMsg);
  });

  test("should difined method decode", () => {
    expect(ROT.decode).toBeDefined();
  });

  test("should return the correct decoding string", () => {
    expect(ROT.decode(resultMsg, shift)).toBe(encodeMsg);
  });

  test("should difined method _transform", () => {
    expect(ROT._transform).toBeDefined();
  });
});
