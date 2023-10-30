function IsString(string) {
  return typeof string === "string";
}

function isDecimal(input) {
  let regex = /^[-+]?[0-9]+\.[0-9]+$/;
  return regex.test(input);
}

function isNumeric(val) {
  return /^-?\d+$/.test(val);
}

function isName(string) {
  let regex = /^[a-zA-Z]*$/;
  return regex.test(string);
}

function isEmail(string) {
  let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(string);
}

function isPassword(string) {
  let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return regex.test(string);
}

module.exports = {
  isDecimal,
  IsString,
  isNumeric,
  isName,
  isEmail,
  isPassword,
};
