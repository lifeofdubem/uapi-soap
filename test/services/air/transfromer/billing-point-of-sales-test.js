const { expect } = require('chai');

const posTransformer = require('../../../../src/services/air/transformers/billing-point-of-sales');

describe('#BillingPointOfSale Transformer', () => {
  it('should add BillingPointOfSale', () => {
    const params = { modifiers: { pos: 'POS' } };
    const expected = {
      'common:BillingPointOfSaleInfo': {
        attributes: {
          OriginApplication: 'POS',
        },

      },
    };

    expect(posTransformer(params)).to.be.deep.equal(expected);
  });

  it('should add BillingPointOfSale using default params', () => {
    const expected = {
      'common:BillingPointOfSaleInfo': {
        attributes: {
          OriginApplication: 'uAPI',
        },

      },
    };

    expect(posTransformer({})).to.be.deep.equal(expected);
    expect(posTransformer({ modifiers: {} })).to.be.deep.equal(expected);
    expect(posTransformer({ modifiers: { pos: '' } })).to.be.deep.equal(expected);
  });
});
