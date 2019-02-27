const chai = require('chai');

const airPricingTransformer = require('../../../../src/services/air/transformers/air-pricing');

const { expect } = chai;

describe('#AirPricing Transformer', () => {
  it('should return an empty object if pricing is not part of params', () => {
    const obj = airPricingTransformer({});
    expect(obj).to.be.deep.equal({});
  });

  it('should always add PublicFaresOnly attribute', () => {
    const expected = {
      AirPricingModifiers: {
        attributes: {
          FaresIndicator: 'PublicFaresOnly',
        },
      },
    };
    const obj = airPricingTransformer({ pricing: {} });

    expect(obj).to.be.deep.equal(expected);
  });

  it('should add all pricing params Currency, ETicketability, SellCheck, PromoCodes', () => {
    const params = {
      pricing: {
        currency: 'USD',
        eTicketability: 'Yes',
        sellCheck: true,
        promoCodes: [
          { code: 'code1', provider: 'provider1', supplier: 'supplier1' },
          { code: 'code2', provider: 'provider2', supplier: 'supplier2' },
        ],
      },
    };
    const expected = {
      AirPricingModifiers: {
        attributes: {
          FaresIndicator: 'PublicFaresOnly',
          CurrencyType: 'USD',
          ETicketability: 'Yes',
          SellCheck: true,

        },
        PromoCodes: {
          PromoCode: [
            { attributes: { Code: 'code1', ProviderCode: 'provider1', SupplierCode: 'supplier1' } },
            { attributes: { Code: 'code2', ProviderCode: 'provider2', SupplierCode: 'supplier2' } },
          ],
        },
      },
    };

    expect(() => airPricingTransformer(params)).to.not.throw();
    expect(airPricingTransformer(params)).to.be.deep.equal(expected);
  });


  describe('#Currency', () => {
    it('should always add currency attribute', () => {
      const expected = {
        AirPricingModifiers: {
          attributes: {
            FaresIndicator: 'PublicFaresOnly',
            CurrencyType: 'USD',
          },
        },
      };
      const params = { pricing: { currency: 'USD' } };

      const obj = airPricingTransformer(params);

      expect(obj).to.be.deep.equal(expected);
    });

    it('should throw an error if currency is more than three characters', () => {
      const params = { pricing: { currency: 'USDS' } };
      expect(() => airPricingTransformer(params)).to.throw('currency length should be equal 3');
    });

    it('should throw an error if currency is less than three characters', () => {
      const params = { pricing: { currency: 'USDS' } };
      expect(() => airPricingTransformer(params)).to.throw('currency length should be equal 3');
    });
  });

  describe('#ETicketability', () => {
    it('should add ETicketability atrribute with value "Yes" ', () => {
      const params = { pricing: { eTicketability: 'Yes' } };
      const expected = {
        AirPricingModifiers: {
          attributes: {
            FaresIndicator: 'PublicFaresOnly',
            ETicketability: 'Yes',
          },
        },
      };

      expect(airPricingTransformer(params)).to.deep.equal(expected);
    });

    it('should add ETicketability atrribute with value "No" ', () => {
      const params = { pricing: { eTicketability: 'No' } };
      const expected = {
        AirPricingModifiers: {
          attributes: {
            FaresIndicator: 'PublicFaresOnly',
            ETicketability: 'No',
          },
        },
      };

      expect(airPricingTransformer(params)).to.deep.equal(expected);
    });

    it('should add ETicketability atrribute with value "Required" ', () => {
      const params = { pricing: { eTicketability: 'Required' } };
      const expected = {
        AirPricingModifiers: {
          attributes: {
            FaresIndicator: 'PublicFaresOnly',
            ETicketability: 'Required',
          },
        },
      };

      expect(airPricingTransformer(params)).to.deep.equal(expected);
    });

    it('should add ETicketability atrribute with value "Ticketless" ', () => {
      const params = { pricing: { eTicketability: 'Ticketless' } };
      const expected = {
        AirPricingModifiers: {
          attributes: {
            FaresIndicator: 'PublicFaresOnly',
            ETicketability: 'Ticketless',
          },
        },
      };

      expect(airPricingTransformer(params)).to.deep.equal(expected);
    });

    it('should throw an Error if eTicketability not in "Yes", "No", "Required", "Ticketless"', () => {
      const params = { pricing: { eTicketability: 'a' } };


      expect(() => airPricingTransformer(params)).to.throw('eTicketability permitted value ["Yes", "No", "Required", "Ticketless"]');
    });

    it('should add eTicketability regardless of value casing', () => {
      expect(() => airPricingTransformer({ pricing: { eTicketability: 'yes' } })).to.not.throw();
      expect(() => airPricingTransformer({ pricing: { eTicketability: 'nO' } })).to.not.throw();
      expect(() => airPricingTransformer({ pricing: { eTicketability: 'RequIreD' } })).to.not.throw();
      expect(() => airPricingTransformer({ pricing: { eTicketability: 'TiCketlesS' } })).to.not.throw();
    });
  });

  describe('#SellCheck', () => {
    it('should add SellCheck attribute if pricing.sellCheck = true', () => {
      const params = { pricing: { sellCheck: true } };
      const expected = {
        AirPricingModifiers: {
          attributes: {
            FaresIndicator: 'PublicFaresOnly',
            SellCheck: true,
          },
        },
      };

      expect(airPricingTransformer(params)).to.be.deep.equal(expected);
    });

    it('should not add SellCheck attribute if pricing.sellCheck = false', () => {
      const params = { pricing: { sellCheck: false } };
      const expected = {
        AirPricingModifiers: {
          attributes: {
            FaresIndicator: 'PublicFaresOnly',
          },
        },
      };

      expect(airPricingTransformer(params)).to.be.deep.equal(expected);
    });
  });

  describe('#PromoCodes', () => {
    it('should add promo codes', () => {
      const params = {
        pricing: {
          promoCodes: [
            { code: 'code1', provider: 'provider1', supplier: 'supplier1' },
            { code: 'code2', provider: 'provider2', supplier: 'supplier2' },
          ],
        },
      };
      const expected = {
        AirPricingModifiers: {
          attributes: {
            FaresIndicator: 'PublicFaresOnly',
          },
          PromoCodes: {
            PromoCode: [
              { attributes: { Code: 'code1', ProviderCode: 'provider1', SupplierCode: 'supplier1' } },
              { attributes: { Code: 'code2', ProviderCode: 'provider2', SupplierCode: 'supplier2' } },
            ],
          },
        },
      };

      expect(airPricingTransformer(params)).to.be.deep.equal(expected);
    });
    it('should not add promo code if array is empty', () => {
      const params = { pricing: { promoCodes: [] } };
      const expected = {
        AirPricingModifiers: {
          attributes: {
            FaresIndicator: 'PublicFaresOnly',
          },
        },
      };
      expect(airPricingTransformer(params)).to.be.deep.equal(expected);
    });
    it('should throw an error if promo code is missing', () => {
      const params = {
        pricing: {
          promoCodes: [
            { provider: 'provider1', supplier: 'supplier1' },
          ],
        },
      };
      expect(() => airPricingTransformer(params)).to.throw('promo code is required');
    });
    it('should throw an error if promo provider is missing', () => {
      const params = {
        pricing: {
          promoCodes: [
            { code: 'code', supplier: 'supplier1' },
          ],
        },
      };
      expect(() => airPricingTransformer(params)).to.throw('promo provider is required');
    });
    it('should throw an error if promo supplier is missing', () => {
      const params = {
        pricing: {
          promoCodes: [
            { code: 'code', provider: 'provider1' },
          ],
        },
      };
      expect(() => airPricingTransformer(params)).to.throw('promo supplier is required');
    });
  });
});
