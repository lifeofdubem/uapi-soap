const _ = require('lodash');

module.exports = (params) => {
  const { modifiers } = params;
  if (!modifiers) return {};

  const root = {
    attributes: {
      TraceId: modifiers.traceId || 'Trace',
    },
  };

  // Add Return Upsell Dare
  if (modifiers.returnUpsellFare) {
    _.assign(root.attributes, {
      ReturnUpsellFare: modifiers.returnUpsellFare,
    });
  }

  // Add Fare Rule
  if (modifiers.fareInfoRules) {
    _.assign(root.attributes, {
      FareInfoRules: modifiers.fareInfoRules,
    });
  }

  // Add Solution Result
  if (modifiers.solutionResult) {
    _.assign(root.attributes, {
      SolutionResult: modifiers.solutionResult,
    });
  }

  // Add AuthorizedBy
  if (modifiers.authorizedBy) {
    _.assign(root.attributes, {
      AuthorizedBy: modifiers.authorizedBy,
    });
  }

  // Add LanguageCode
  if (modifiers.language) {
    _.assign(root.attributes, {
      LanguageCode: modifiers.language,
    });
  }

  // Add Log Level
  if (modifiers.logLevel) {
    const logLevel = modifiers.logLevel.toUpperCase();
    if (!['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'].includes(logLevel)) {
      // TODO Add custom error class
      throw new Error('logLevel must be set to TRACE or DEBUG or INFO or WARN or ERROR or FATAL');
    }
    _.assign(root.attributes, {
      OverrideLogging: logLevel,
    });
  }

  return root;
};
