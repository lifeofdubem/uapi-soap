/* eslint-disable no-unused-expressions */
const chai = require('chai');

const lowfareParser = require('../../../../src/services/air/parsers/lowfare-parser');
const lowfareRes = require('../../../data/lowfareRes.json');

const { expect } = chai;

describe('#LowfareParser', () => {
  it('shold parse response without throwing', () => {
    lowfareRes.forEach((lowfare) => {
      expect(() => lowfareParser(lowfare)).to.not.throw();
    });
  });

  it('should return correct data structure', () => {
    lowfareRes.forEach((lowfare) => {
      const parsed = lowfareParser(lowfare);
      expect(parsed).to.not.be.empty;
      expect(parsed.traceId).to.not.be.empty;
      expect(parsed.transactionId).to.not.be.empty;
      expect(parsed.distanceUnits).to.not.be.empty;
      expect(parsed.currency).to.not.be.empty;
      expect(parsed.responseTime).to.not.be.empty;
      expect(parsed.solutions).to.not.be.empty;
      expect(parsed.solutions).to.be.an.instanceOf(Array);
    });
  });
});
