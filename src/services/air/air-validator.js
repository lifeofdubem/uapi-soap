const _ = require('lodash');

module.exports = {
  lowfare: (params) => {
    const obj = {};
    // Add TargetBranch
    _.assign(obj, { a: 'a' });
    return {
      'common:BillingPointOfSaleInfo': {
        attributes: {
          OriginApplication: 'uAPI',
        },
      },
      SearchAirLeg: {
        SearchOrigin: {
          'common:CityOrAirport': {
            attributes: {
              Code: params.legs[0].from + 's',
              PreferCity: true,
            },
          },
        },
        SearchDestination: {
          'common:CityOrAirport': {
            attributes: {
              Code: params.legs[0].to,
              PreferCity: true,
            },
          },
        },
        SearchDepTime: {
          attributes: {
            PreferredTime: params.legs[0].departureDate,
          },
        },
      },
      AirSearchModifiers: {
        PreferredProviders: {
          'common:Provider': {
            attributes: {
              Code: params.provider || '1G',
            },
          },
        },
      },
      'common:SearchPassenger': {
        attributes: {
          Code: 'ADT',
        },
      },
    };

    return obj;
  },
};
