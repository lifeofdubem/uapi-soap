const lowfareParser = fare => fare;
const airErrors = err => err.root.Envelope;
module.exports = {
  lowfareParser,
  airErrors,
};
