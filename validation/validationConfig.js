const validationConfig = (str) => {
  if (typeof str !== "string") return false;
  if(str.length === 0) return false;
  return str.split("-").every((el) => /^[CR][01]$|^A$/g.test(el));
};

module.exports = validationConfig;
