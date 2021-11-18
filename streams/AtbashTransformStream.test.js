const AtbashTransformStream = require("./AtbashTransformStream");

describe("Transform stream: testing Atbash transform", () => {

  let atbash = new AtbashTransformStream();
  const encodeMsg = "ABCabc123";
  const resultMsg = "ZYXzyx123";

  test("should difined method encode", () => {
    expect(atbash.encode).toBeDefined();
  });

  test("should return the correct encoding string", () => {
    expect(atbash.encode(encodeMsg)).toBe(resultMsg);
  });

  test("should difined method _transform", () => {
    expect(atbash._transform).toBeDefined();
  });
});
