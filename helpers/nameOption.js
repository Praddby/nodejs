const nameOption = (arr, obj) => {
  return arr[(obj.shortIdx || obj.idx) + 1];
};

module.exports = nameOption;
