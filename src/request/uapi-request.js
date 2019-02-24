/* eslint-disable no-param-reassign */
const { pd } = require('pretty-data');
const {
  RequestValidationError,
  // RequestRuntimeError,
} = require('./RequestErrors');


/**
 * basic function for requests/responses
 * @param  {string} service          service url for current response (gateway)
 * @param  {function} validateFunction function for validation
 * @param  {function} errorHandler    function that gets SOAP:Fault object and handle error
 * @param  {function} responseParser    function for transforming json soap object to desire object
 * @param  {boolean} debugMode        true - log requests, false - dont
 * @param  {object} options
 * @return {Promise}                  returning promise for best error handling ever)
 */
module.exports = function uapiRequest(
  service,
  auth,
  validateFunction,
  errorHandler,
  responseParser,
  debugMode = 0,
  options = {},

) {
  const log = options.logFunction || console.log;

  // Performing checks
  if (!service) {
    throw new RequestValidationError.ServiceUrlMissing();
  }

  return function serviceFunc(params) {
    if (debugMode) {
      log('Input params ', pd.json(params));
    }
    const validateInput = () => Promise.resolve(params)
      .then(validateFunction)
      .then((validatedParams) => {
        params = validatedParams || params;
        return params;
      });

    const sendRequest = payload => new Promise((resolve, reject) => {
      service(payload, (error, result, rawResponse, soapHeader, rawRequest) => {
        if (error) {
          if (debugMode >= 2) {
            // log('Soap Header: ', pd.xml(soapHeader));
            log('Request XML: ', pd.xml(rawRequest));
          }

          if (debugMode) {
            log('Error: ', pd.json(error));
          }

          return reject(pd.json(errorHandler(error)));// reject(pd.json(error))
        }

        if (debugMode >= 2) {
          log('Request XML: ', pd.xml(rawRequest));
          log('Response XML: ', pd.xml(rawResponse));
        }
        return resolve(result);
      }, options);
    });

    const handleSuccess = (result) => {
      if (debugMode > 1) {
        if (typeof result === 'string') {
          log('Returning result', result);
        } else {
          log('Returning result', pd.json(result));
        }
      }
      return result;
    };

    return validateInput()
      .then(sendRequest)
      .then(responseParser)
      .then(handleSuccess);
  };
};
