module.exports = {
  lowfare: params => ({
    attributes: {
      TargetBranch: 'P7087541',
    },
    'common:BillingPointOfSaleInfo': {
      attributes: {
        OriginApplication: 'uAPI',
      },
    },
    SearchAirLeg: {
      SearchOrigin: {
        'common:CityOrAirport': {
          attributes: {
            Code: params.legs[0].from,
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
  }),
};
