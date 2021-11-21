const duplicateOption = (obj) => {
  if (obj.shortIdx !== obj.shortLastIdx || obj.idx !== obj.lastIdx || (obj.shortIdx !== null && obj.idx !== null)) {
    return true;
  }
  return false;
};

module.exports = duplicateOption;
