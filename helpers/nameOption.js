const nameOption = (arr, obj) => {
  const name = arr[(obj.shortIdx || obj.idx) + 1];
  if (name && !/^\-[cio]/.test(name)) {
    return name;
  }
  return null;
};

module.exports = nameOption;
