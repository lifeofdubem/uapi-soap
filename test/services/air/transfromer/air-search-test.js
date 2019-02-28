const { expect } = require('chai');

const airSerchModifier = require('../../../../src/services/air/transformers/air-search');

describe('#AirSerchModifier Transferformer', () => {
  it('shold turn an empty object if modifiers is undefined', () => {
    const expected = {
      AirSearchModifiers: {
        attributes: {
        },
        PreferredProviders: {
          'common:Provider': {
            attributes: {
              Code: '1G',
            },
          },
        },
      },
    };
    expect(airSerchModifier({})).to.be.deep.equal({});
    expect(airSerchModifier({ modifiers: {} })).to.be.deep.equal(expected);
  });
  describe('#MaxConnectionTime', () => {
    it('should add MaxConnectionTime to attributes', () => {
      const params = { modifiers: { maxJourneyTime: 50 } };
      const expected = {
        AirSearchModifiers: {
          attributes: {
            MaxJourneyTime: 50,
          },
          PreferredProviders: {
            'common:Provider': {
              attributes: {
                Code: '1G',
              },
            },
          },
        },
      };

      expect(airSerchModifier(params)).to.be.deep.equal(expected);
    });

    it('should throw an error if modifiers.maxConnectionTime < 1 or > 99', () => {
      const params1 = { modifiers: { maxConnectionTime: -1 } };
      const params2 = { modifiers: { maxConnectionTime: 100 } };

      expect(() => airSerchModifier(params1)).to.throw('maxConnectionTime can not be less than 1');
      expect(() => airSerchModifier(params2)).to.throw('maxConnectionTime can not be greater than 99');
    });
  });

  describe('#MaxJourneyTime', () => {
    it('should add MaxJourneyTime', () => {
      const params = { modifiers: { maxConnectionTime: 50 } };
      const expected = {
        AirSearchModifiers: {
          attributes: {
            MaxConnectionTime: 50,
          },
          PreferredProviders: {
            'common:Provider': {
              attributes: {
                Code: '1G',
              },
            },
          },
        },
      };

      expect(airSerchModifier(params)).to.be.deep.equal(expected);
    });
    it('should throw an error if modifiers.maxJourneyTime < 1 or > 99', () => {
      const params1 = { modifiers: { maxJourneyTime: -1 } };
      const params2 = { modifiers: { maxJourneyTime: 100 } };

      expect(() => airSerchModifier(params1)).to.throw('maxJourneyTime can not be less than 1');
      expect(() => airSerchModifier(params2)).to.throw('maxJourneyTime can not be greater than 99');
    });
  });

  describe('#PreferNonStop', () => {
    it('should add PreferNonStop', () => {
      const params = { modifiers: { preferNonStop: true } };
      const expected = {
        AirSearchModifiers: {
          attributes: {
            PreferNonStop: true,
          },
          PreferredProviders: {
            'common:Provider': {
              attributes: {
                Code: '1G',
              },
            },
          },
        },
      };

      expect(airSerchModifier(params)).to.be.deep.equal(expected);
    });
    it('should not add PreferNonStop if modifier.preferNonStop = false', () => {
      const params = { modifiers: { PreferNonStop: false } };
      const expected = {
        AirSearchModifiers: {
          attributes: {
          },
          PreferredProviders: {
            'common:Provider': {
              attributes: {
                Code: '1G',
              },
            },
          },
        },
      };

      expect(airSerchModifier(params)).to.be.deep.equal(expected);
    });
  });

  describe('#DistanceType', () => {
    it('should add DistanceType if modifiers.distanceUnit = "MI"', () => {
      const params = { modifiers: { distanceUnit: 'MI' } };
      const expected = {
        AirSearchModifiers: {
          attributes: {
            DistanceType: "MI",
          },
          PreferredProviders: {
            'common:Provider': {
              attributes: {
                Code: '1G',
              },
            },
          },
        },
      };

      expect(airSerchModifier(params)).to.be.deep.equal(expected);
    });

    it('should add DistanceType if modifiers.distanceUnit = "KM"', () => {
      const params = { modifiers: { distanceUnit: 'KM' } };
      const expected = {
        AirSearchModifiers: {
          attributes: {
            DistanceType: "KM",
          },
          PreferredProviders: {
            'common:Provider': {
              attributes: {
                Code: '1G',
              },
            },
          },
        },
      };

      expect(airSerchModifier(params)).to.be.deep.equal(expected);
    });

    it('should add DistanceType regardless of modifiers.distanceUnit letter case', () => {
      const params1 = { modifiers: { distanceUnit: 'Km' } };
      const expected1 = {
        AirSearchModifiers: {
          attributes: {
            DistanceType: "KM",
          },
          PreferredProviders: {
            'common:Provider': {
              attributes: {
                Code: '1G',
              },
            },
          },
        },
      };
      const params2 = { modifiers: { distanceUnit: 'mi' } };
      const expected2 = {
        AirSearchModifiers: {
          attributes: {
            DistanceType: "MI",
          },
          PreferredProviders: {
            'common:Provider': {
              attributes: {
                Code: '1G',
              },
            },
          },
        },
      };

      expect(airSerchModifier(params1)).to.be.deep.equal(expected1);
      expect(airSerchModifier(params2)).to.be.deep.equal(expected2);
    });
    
    it('should throw an error if modifiers.distanceUnit not in "KM","MI"', () => {
      const params1 = { modifiers: { distanceUnit: 'K' } };
      const params2 = { modifiers: { distanceUnit: 'MII' } };

      expect(() => airSerchModifier(params1)).to.throw('distanceUnit can be either "KM" or "MI"');
      expect(() => airSerchModifier(params2)).to.throw('distanceUnit can be either "KM" or "MI"');
    });
  });
});
