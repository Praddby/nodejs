const MyWriteStream = require("./MyWriteStream");
const fs = require("fs");
const fsPromises = require("fs/promises");

describe("Writable stream: testing my write stream", () => {
  const message = "Text for testing work my write stream!";
  let file = "fileForWrite.txt";
  let result;
  const writeStream = new MyWriteStream(file);

  beforeAll(() => {
    fs.open(file, "w", (err) => {
      if(err) throw err;
    });
    result = writeStream.write(message)
  });

  afterAll(() => {
    fs.unlink(file, (err) => {
      if(err) throw err;
    });
  });

  test("should difined method _write", () => {
    expect(writeStream._write).toBeDefined();
  });

  test("should write message to file", () => {
    expect(result).toBeTruthy();
  });

  test("should read data from file", async () => {
    const data = await fsPromises.readFile(file);
    expect(data.toString()).toBe(message);
  });
});
