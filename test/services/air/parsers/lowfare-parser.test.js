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
});
