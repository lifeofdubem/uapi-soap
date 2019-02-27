const chai = require('chai');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const auth = require('../../testconfig');

const { expect } = chai;
chai.use(sinonChai);

describe('#AirService', () => {
  describe('Shop', () => {
    it('should check if correct function from service is called', async () => {
      const searchLowFares = sinon.spy(() => { });
      const service = () => ({ searchLowFares });
      const createAirService = proxyquire('../../../src/services/air/air', {
        './air-service': service,
      });
      const airService = await createAirService({ auth });
      airService.shop({});
      expect(searchLowFares.calledOnce).to.be.equal(true);
    });
  });
});
