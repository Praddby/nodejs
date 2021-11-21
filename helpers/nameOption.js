const nameOption = (arr, obj) => {
  const name = arr[(obj.shortIdx || obj.idx) + 1];
  if (name && !/^\-{1,2}[cio]/.test(name)) {
    return name;
  }
  return null;
};

module.exports = nameOption;
