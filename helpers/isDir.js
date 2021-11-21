const fs = require("fs");
const path = require("path");

const isDir = (pathFile) => {
  try {
    const stats = fs.statSync(pathFile);
    if (stats.isDirectory()) {
      return true;
    }
    return false;
  } catch (e) {
    process.stderr.write(`Not fount file: This file "${path.basename(pathFile)}" do not exist!`);
    process.exit(1);
  }
}

module.exports = isDir;