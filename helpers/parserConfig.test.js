const parserConfig = require("./parserConfig");
const {
  CaesarTransformStream,
  AtbashTransformStream,
  ROTTransformStream,
} = require("../streams");

describe("Helpers: testing parser config function", () => {
  test("should return instanceof AtbashTransformStream", () => {
    const obfectA = parserConfig("A")[0];
    expect(obfectA).toBeInstanceOf(AtbashTransformStream);
  });

  test("should return instanceof CaesarTransformStream", () => {
    const obfectC0 = parserConfig("C0")[0];
    const obfectC1 = parserConfig("C1")[0];
    expect(obfectC0).toBeInstanceOf(CaesarTransformStream);
    expect(obfectC1).toBeInstanceOf(CaesarTransformStream);
  });

  test("should return instanceof ROTTransformStream", () => {
    const obfectR0 = parserConfig("R0")[0];
    const obfectR1 = parserConfig("R1")[0];
    expect(obfectR0).toBeInstanceOf(ROTTransformStream);
    expect(obfectR1).toBeInstanceOf(ROTTransformStream);
  });
});
