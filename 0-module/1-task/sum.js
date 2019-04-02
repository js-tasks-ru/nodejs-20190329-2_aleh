const isNumber = require('./helpers/is-number');

function sum(a, b) {
  if (!isNumber(a) || !isNumber(b)) {
      throw new TypeError('Arguments of `sum` must be numeric!');
  }
  return a + b;
}

module.exports = sum;
