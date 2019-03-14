const lowfareParser = require('./parsers/lowfare-parser');

const airErrorParser = (err) => {
  if (err.root) { return err.root.Envelope; }
  return err;
};
module.exports = {
  lowfareParser,
  airErrorParser,
};
