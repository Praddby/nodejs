const validationConfig = (str) => {
  if (typeof str !== "string") return false;
  if(str.length === 0) return false;
  return str.split("-").every((el) => /^[C,R,0,1]{2}$|^[A]{1}$/gi.test(el));
};

module.exports = validationConfig;
