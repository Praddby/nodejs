const { spawnSync } = require('child_process');

describe("Testing end-2-end", () => {

  test("should return encode string for config #1 from task 1", () => {
    const cp = spawnSync('node', ['index', '-c', 'C1-C1-R0-A', '--input', './input.txt']);
    const message = 'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!';
    expect(cp.stdout.toString()).toContain(message);
  });

  test("should return encode string for config #2 from task 1", () => {
    const cp = spawnSync('node', ['index', '-c', 'C1-C0-A-R1-R0-A-R0-R0-C1-A', '--input', './input.txt']);
    const message = 'Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!';
    expect(cp.stdout.toString()).toContain(message);
  });

  test("should return encode string for config #3 from task 1", () => {
    const cp = spawnSync('node', ['index', '-c', 'A-A-A-R1-R0-R0-R0-C1-C1-A', '--input', './input.txt']);
    const message = 'Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!';
    expect(cp.stdout.toString()).toContain(message);
  });

  test("should return encode string for config #4 from task 1", () => {
    const cp = spawnSync('node', ['index', '-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', '--input', './input.txt']);
    const message = 'This is secret. Message about "_" symbol!';
    expect(cp.stdout.toString()).toContain(message);
  });

  test("should return Error for dubplicate config", () => {
    const cp = spawnSync('node', ['index', '-c', 'C1-C1-A-R0', '-c', 'C0']);
    const error = "Duplicated config option";
    expect(cp.stderr.toString()).toContain(error);
  });

  test("should return Error for missing value config", () => {
    const cp = spawnSync('node', ['index', '--config']);
    const error = "Missing value for '-c' or '--config'";
    expect(cp.stderr.toString()).toContain(error);
  });

  test("should return Error for bad file input", () => {
    const badFile = "badInput.txt";
    const cp = spawnSync('node', ['index', '--config', 'A', '-i', badFile]);
    const error = `This file "${badFile}" do not exist`;
    expect(cp.stderr.toString()).toContain(error);
  });

  test("should return Error for bad file output", () => {
    const badFile = "badOutput.txt";
    const cp = spawnSync('node', ['index', '--config', 'A', '-o', badFile]);
    const error = `This file "${badFile}" do not exist`;
    expect(cp.stderr.toString()).toContain(error);
  });

  const badConfigs = ["A0-C2", "-", "C0--R1", "123", "c1", "3R-C0"];

  test.each(badConfigs)(
      "should return Error for incorrent config: %j",
      (badConfig) => {
        const cp = spawnSync('node', ['index', '--config', badConfig]);
        const error = `This config "${badConfig}" is invalid`;
        expect(cp.stderr.toString()).toContain(error);
      }
  );
});
