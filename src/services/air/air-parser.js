const lowfareParser = fare => fare;
const airErrorParser = err => err.root.Envelope;
module.exports = {
  lowfareParser,
  airErrorParser,
};
