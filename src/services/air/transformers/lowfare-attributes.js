const _ = require('lodash');

module.exports = (params) => {
  const lowfarAttributes = {
    attributes: {
      TraceId: params.modifiers.traceId || 'Trace',
    },
  };

  // Add Return Upsell Dare
  if (params.modifiers.returnUpsellFare) {
    _.assign(lowfarAttributes.attributes, {
      ReturnUpsellFare: params.modifiers.returnUpsellFare,
    });
  }

  // Add Fare Rule
  if (params.modifiers.fareInfoRules) {
    _.assign(lowfarAttributes.attributes, {
      FareInfoRules: params.modifiers.fareInfoRules,
    });
  }

  // Add Solution Result
  if (params.modifiers.solutionResult) {
    _.assign(lowfarAttributes.attributes, {
      SolutionResult: params.modifiers.solutionResult,
    });
  }

  // Add AuthorizedBy
  if (params.modifiers.authorizedBy) {
    _.assign(lowfarAttributes.attributes, {
      AuthorizedBy: params.modifiers.authorizedBy,
    });
  }

  // Add LanguageCode
  if (params.modifiers.language) {
    _.assign(lowfarAttributes.attributes, {
      LanguageCode: params.modifiers.language,
    });
  }

  // Add Log Level
  if (params.modifiers.logLevel) {
    const logLevel = params.modifiers.logLevel.toUpperCase();
    if (!['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'].includes(logLevel)) {
      // TODO Add custom error class
      throw new Error('logLevel must be set to TRACE or DEBUG or INFO or WARN or ERROR or FATAL');
    }
    _.assign(lowfarAttributes.attributes, {
      OverrideLogging: logLevel,
    });
  }

  return lowfarAttributes;
};
