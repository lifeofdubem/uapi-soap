const _ = require('lodash');

module.exports = (params) => {
  const { modifiers } = params;
  if (!modifiers) {
    return {};
  }
  const searchModiiers = {
    AirSearchModifiers: {
      attributes: {
      },
      PreferredProviders: {
        'common:Provider': {
          attributes: {
            Code: params.provider || '1G',
          },
        },
      },
    },
  };

  // Add Max Connection Time
  if (modifiers.maxConnectionTime) {
    _.assign(searchModiiers.AirSearchModifiers.attributes, {
      MaxConnectionTime: modifiers.maxConnectionTime,
    });
  }

  // Add Max Journey Time
  if (modifiers.maxJourneyTime) {
    _.assign(searchModiiers.AirSearchModifiers.attributes, {
      MaxJourneyTime: modifiers.maxJourneyTime,
    });
  }

  // Add PreferNonStop
  if (modifiers.preferNonStop) {
    _.assign(searchModiiers.AirSearchModifiers.attributes, {
      PreferNonStop: modifiers.preferNonStop,
    });
  }

  // Add Distance Type
  if (modifiers.distanceUnit) {
    const distanceUnit = modifiers.distanceUnit.toUpperCase();
    if (!['MI', 'KM'].includes(distanceUnit)) {
      // TODO create custom error class
      throw new Error('Distance Unit enum ["MI", "KM"]');
    }
    _.assign(searchModiiers.AirSearchModifiers.attributes, {
      DistanceType: distanceUnit,
    });
  }

  // Add IncludeExtraSolutions
  if (modifiers.includeExtraSolutions || modifiers.searchWeekends) {
    _.assign(searchModiiers.AirSearchModifiers.attributes, {
      SearchWeekends: true,

      IncludeExtraSolutions: modifiers.includeExtraSolutions || false,
    });
  }


  // Add Max Results
  if (modifiers.maxResults) {
    _.assign(searchModiiers.AirSearchModifiers.attributes, {
      MaxSolutions: modifiers.maxResults,
    });
  }


  // Add Permitted Carries
  if (modifiers.carriers && modifiers.carriers.length) {
    searchModiiers.AirSearchModifiers.PermittedCarriers = {
      'common:Carrier': [],
    };
    modifiers.carriers.forEach((carrier) => {
      searchModiiers.AirSearchModifiers.PermittedCarriers['common:Carrier'].push({
        attributes: {
          Code: carrier,
        },
      });
    });
  }

  // Add Permitted Cabins
  if (modifiers.cabins && modifiers.cabins.length) {
    // AconstirLegModifiers = {};

    searchModiiers.AirSearchModifiers.PreferredCabins = {
      'common:CabinClass': [],
    };
    modifiers.cabins.forEach((cabin) => {
      searchModiiers.AirSearchModifiers.PreferredCabins['common:CabinClass'].push({
        attributes: {
          Type: cabin,
        },
      });
    });
  }

  // Add  Non Stop Direct NonStopDirects
  if (modifiers.nonStop) {
    searchModiiers.AirSearchModifiers.FlightType = {
      attributes: {
        NonStopDirects: modifiers.nonStop,
      },

    };
  }

  return searchModiiers;
};
