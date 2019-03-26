const { expect } = require('chai');

const airTransformer = require('../../../../src/services/air/air-transformer');

describe('#AirTransformer', () => {
  describe('#LowfareSearchTransformer', () => {
    it('should transform one way flight using default params', () => {
      const params = {
        legs: [{
          from: 'LOS',
          to: 'NYC',
          departureDate: '2019-06-10',
        }],
      };

      const expected = {
        SearchAirLeg: [
          {
            SearchDepTime: {
              attributes: {
                PreferredTime: '2019-06-10',
              },
            },
            SearchOrigin: {
              'common:CityOrAirport': {
                attributes: {
                  Code: 'LOS',
                  PreferCity: true,
                },
              },
            },
            SearchDestination: {
              'common:CityOrAirport': {
                attributes: {
                  Code: 'NYC',
                  PreferCity: true,
                },
              },
            },
          },
        ],
        'common:SearchPassenger': [{
          attributes: {
            Code: 'ADT',
          },
        }],
        'common:BillingPointOfSaleInfo': {
          attributes: {
            OriginApplication: 'uAPI',
          },
        },
        attributes: {
          ReturnUpsellFare: true,
          TraceId: 'Trace',
        },

      };

      expect(airTransformer.lowfareSearchTransformer(params)).to.be.deep.equal(expected);
    });

    it('should transform return flight using default params', () => {
      const params = {
        legs: [{
          from: 'LOS',
          to: 'NYC',
          departureDate: '2019-06-10',
        }, {
          from: 'NYC',
          to: 'LOS',
          departureDate: '2019-07-10',
        }],
      };

      const expected = {
        SearchAirLeg: [
          {
            SearchDepTime: {
              attributes: {
                PreferredTime: '2019-06-10',
              },
            },
            SearchOrigin: {
              'common:CityOrAirport': {
                attributes: {
                  Code: 'LOS',
                  PreferCity: true,
                },
              },
            },
            SearchDestination: {
              'common:CityOrAirport': {
                attributes: {
                  Code: 'NYC',
                  PreferCity: true,
                },
              },
            },
          }, {
            SearchDepTime: {
              attributes: {
                PreferredTime: '2019-07-10',
              },
            },
            SearchOrigin: {
              'common:CityOrAirport': {
                attributes: {
                  Code: 'NYC',
                  PreferCity: true,
                },
              },
            },
            SearchDestination: {
              'common:CityOrAirport': {
                attributes: {
                  Code: 'LOS',
                  PreferCity: true,
                },
              },
            },
          },
        ],
        'common:SearchPassenger': [{
          attributes: {
            Code: 'ADT',
          },
        }],
        'common:BillingPointOfSaleInfo': {
          attributes: {
            OriginApplication: 'uAPI',
          },
        },
        attributes: {
          ReturnUpsellFare: true,
          TraceId: 'Trace',
        },

      };

      expect(airTransformer.lowfareSearchTransformer(params)).to.be.deep.equal(expected);
    });

    it('should transform one way flight with defined passengers', () => {
      const params = {
        legs: [{
          from: 'LOS',
          to: 'NYC',
          departureDate: '2019-06-10',
        }],
        passengers: { adt: 2, cnn: [{ age: 5 }], inf: 1 },
      };

      const expected = {
        SearchAirLeg: [
          {
            SearchDepTime: {
              attributes: {
                PreferredTime: '2019-06-10',
              },
            },
            SearchOrigin: {
              'common:CityOrAirport': {
                attributes: {
                  Code: 'LOS',
                  PreferCity: true,
                },
              },
            },
            SearchDestination: {
              'common:CityOrAirport': {
                attributes: {
                  Code: 'NYC',
                  PreferCity: true,
                },
              },
            },
          },
        ],
        'common:SearchPassenger': [{
          attributes: {
            Code: 'ADT',
          },
        }, {
          attributes: {
            Code: 'ADT',
          },
        }, {
          attributes: {
            Code: 'CNN',
            Age: 5,
          },
        }, {
          attributes: {
            Code: 'INF',
            Age: 1,
          },
        }],
        'common:BillingPointOfSaleInfo': {
          attributes: {
            OriginApplication: 'uAPI',
          },
        },
        attributes: {
          ReturnUpsellFare: true,
          TraceId: 'Trace',
        },
      };

      expect(airTransformer.lowfareSearchTransformer(params)).to.be.deep.equal(expected);
    });

    it('should transform one way flight with air pricing details', () => {
      const params = {
        legs: [{
          from: 'LOS',
          to: 'NYC',
          departureDate: '2019-06-10',
        }],
        pricing: {
          currency: 'USD',
          eTicketability: 'Yes',
          sellCheck: true,
        },
      };

      const expected = {
        SearchAirLeg: [
          {
            SearchDepTime: {
              attributes: {
                PreferredTime: '2019-06-10',
              },
            },
            SearchOrigin: {
              'common:CityOrAirport': {
                attributes: {
                  Code: 'LOS',
                  PreferCity: true,
                },
              },
            },
            SearchDestination: {
              'common:CityOrAirport': {
                attributes: {
                  Code: 'NYC',
                  PreferCity: true,
                },
              },
            },
          },
        ],
        'common:SearchPassenger': [{
          attributes: {
            Code: 'ADT',
          },
        }],
        'common:BillingPointOfSaleInfo': {
          attributes: {
            OriginApplication: 'uAPI',
          },
        },
        AirPricingModifiers: {
          attributes: {
            CurrencyType: 'USD',
            ETicketability: 'Yes',
            SellCheck: true,
          },
        },
        attributes: {
          ReturnUpsellFare: true,
          TraceId: 'Trace',
        },
      };

      expect(airTransformer.lowfareSearchTransformer(params)).to.be.deep.equal(expected);
    });
  });
});
