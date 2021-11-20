const MyReadStream = require("./MyReadStream");
const fs = require("fs");

describe("Readable stream: testing my read stream", () => {
  const message = "Text for testing work my read stream!";
  let file = "fileForRead.txt";
  let readStream;

  beforeAll(() => {
    fs.open(file, "w", (err) => {
      if(err) throw err;
    });
  
    fs.appendFile(file, message, (err) => {
      if(err) throw err;
    });
  
    readStream = new MyReadStream(file);
  });

  afterAll(() => {
    fs.unlink(file, (err) => {
      if(err) throw err;
    });
  });

  test("should difined method _read", () => {
    expect(readStream._read).toBeDefined();
  });

  test("should read data from file", done => {
    readStream.on("data", chunk => {
      expect(chunk.toString()).toBe(message);
      done();
    });
  });
});
