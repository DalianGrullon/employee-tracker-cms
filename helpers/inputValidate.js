function numVerify(test) {
  return test.match(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/) 
    ? true 
    : 'Invalid entry, must be a number!';
}

function noSpace(test) {
  return test.match(/\s/g) 
    ? 'Invalid entry, refer to question!' 
    : true;
}

module.exports = {
  numVerify,
  noSpace
};