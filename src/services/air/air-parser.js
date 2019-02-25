const lowfareParser = fare => fare;
const airErrorParser = (err) => {
  if (err.root) { return err.root.Envelope; }
  return err;
};
module.exports = {
  lowfareParser,
  airErrorParser,
};
