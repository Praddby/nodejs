const entryArgv = (argv, short, long) => {
  const shortIdx = ~argv.indexOf(short) ? argv.indexOf(short) : null;
  const shortLastIdx = ~argv.lastIndexOf(short) ? argv.lastIndexOf(short) : null;
  const idx = ~argv.indexOf(long) ? argv.indexOf(long) : null;
  const lastIdx = ~argv.lastIndexOf(long) ? argv.lastIndexOf(long) : null;

  if (shortIdx === null && shortLastIdx === null && idx === null && lastIdx === null) {
    return null;
  }
  return {
    shortIdx,
    shortLastIdx,
    idx,
    lastIdx
  }
};

module.exports = entryArgv;
