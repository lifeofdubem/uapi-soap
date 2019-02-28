const _ = require('lodash');

module.exports = (params) => {
  const { modifiers } = params;
  if (!modifiers) {
    return {};
  }
  const root = {
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
    if (modifiers.maxConnectionTime < 1) {
      // TODO add custom error class
      throw new Error('modifiers.maxConnectionTime can not be less than 1');
    }
    if (modifiers.maxConnectionTime > 99) {
      // TODO add custom error class
      throw new Error('modifiers.maxConnectionTime can not be greater than 99');
    }
    _.assign(root.AirSearchModifiers.attributes, {
      MaxConnectionTime: modifiers.maxConnectionTime,
    });
  }

  // Add Max Journey Time
  if (modifiers.maxJourneyTime) {
    if (modifiers.maxJourneyTime < 1) {
      // TODO add custom error class
      throw new Error('modifiers.maxJourneyTime can not be less than 1');
    }
    if (modifiers.maxJourneyTime > 99) {
      // TODO add custom error class
      throw new Error('modifiers.maxJourneyTime can not be greater than 99');
    }
    _.assign(root.AirSearchModifiers.attributes, {
      MaxJourneyTime: modifiers.maxJourneyTime,
    });
  }

  // Add PreferNonStop
  if (modifiers.preferNonStop) {
    _.assign(root.AirSearchModifiers.attributes, {
      PreferNonStop: modifiers.preferNonStop,
    });
  }

  // Add Distance Type
  if (modifiers.distanceUnit) {
    const distanceUnit = String(modifiers.distanceUnit).toUpperCase();
    if (!['MI', 'KM'].includes(distanceUnit)) {
      // TODO create custom error class
      throw new Error('pricing.distanceUnit can be either "KM" or "MI"');
    }
    _.assign(root.AirSearchModifiers.attributes, {
      DistanceType: distanceUnit,
    });
  }

  // Add IncludeExtraSolutions
  if (modifiers.includeExtraSolutions || modifiers.searchWeekends) {
    _.assign(root.AirSearchModifiers.attributes, {
      SearchWeekends: true,

      IncludeExtraSolutions: modifiers.includeExtraSolutions || false,
    });
  }


  // Add Max Results
  if (modifiers.maxResults) {
    _.assign(root.AirSearchModifiers.attributes, {
      MaxSolutions: modifiers.maxResults,
    });
  }


  // Add Permitted Carries
  if (modifiers.carriers && modifiers.carriers.length) {
    root.AirSearchModifiers.PermittedCarriers = {
      'common:Carrier': [],
    };
    modifiers.carriers.forEach((carrier) => {
      root.AirSearchModifiers.PermittedCarriers['common:Carrier'].push({
        attributes: {
          Code: carrier,
        },
      });
    });
  }

  // Add Permitted Cabins
  if (modifiers.cabins && modifiers.cabins.length) {
    // AconstirLegModifiers = {};

    root.AirSearchModifiers.PreferredCabins = {
      'common:CabinClass': [],
    };
    modifiers.cabins.forEach((cabin) => {
      root.AirSearchModifiers.PreferredCabins['common:CabinClass'].push({
        attributes: {
          Type: cabin,
        },
      });
    });
  }

  // Add  Non Stop Direct NonStopDirects
  if (modifiers.nonStop) {
    root.AirSearchModifiers.FlightType = {
      attributes: {
        NonStopDirects: modifiers.nonStop,
      },

    };
  }

  return root;
};
