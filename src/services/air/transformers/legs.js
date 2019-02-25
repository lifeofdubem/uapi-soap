const moment = require('moment');

module.exports = (params) => {
  const legs = { SearchAirLeg: [] };


  params.legs.forEach((leg) => {
    // cabins = cabins || []; // ['Economy', 'Business', 'First', 'PremiumEconomy', 'PremiumFirst'];
    let AirLegModifiers;

    const { cabins } = leg;
    if (cabins && cabins.length > 0) {
      AirLegModifiers = {};
      AirLegModifiers.PreferredCabins = {
        'common:CabinClass': [],
      };
      cabins.forEach((cabin) => {
        AirLegModifiers.PreferredCabins['common:CabinClass'].push({
          attributes: {
            Type: cabin,
          },
        });
      });
    }
    const legParam = {
      SearchOrigin: {
        'common:CityOrAirport': {
          attributes: {
            Code: leg.from,
            PreferCity: true,
          },
        },
      },
      SearchDestination: {
        'common:CityOrAirport': {
          attributes: {
            Code: leg.to,
            PreferCity: true,
          },
        },
      },
      SearchDepTime: {
        attributes: {
          PreferredTime: moment(new Date(leg.departureDate)).format('YYYY-MM-DD'),
        },
      },
      // AirLegModifiers,
    };
    if (AirLegModifiers) {
      legParam.AirLegModifiers = AirLegModifiers;
    }
    legs.SearchAirLeg.push(legParam);
  });

  return legs;
};
