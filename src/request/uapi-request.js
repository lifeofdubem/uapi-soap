/* eslint-disable no-param-reassign */
const { pd } = require('pretty-data');
const {
  RequestValidationError,
  // RequestRuntimeError,
} = require('./RequestErrors');


/**
 * basic function for requests/responses
 * @param  {string} service          service url for current response (gateway)
 * @param  {function} validateFunction function for validating payload
 * @param  {function} requestParserFunction function for parseing payload
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
  requestParserFunction,
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
  if (!auth || auth.targetBranch === undefined) {
    throw new RequestValidationError.AuthDataMissing();
  }

  return function serviceFunc(params) {
    if (debugMode) {
      log('Input params ', pd.json(params));
    }
    const validateInput = () => Promise.resolve(params)
      .then(validateFunction);


    const handleSuccess = (result) => {
      if (responseParser) { result = responseParser(result); }
      if (debugMode) {
        log('Response: ', pd.json(result));
      }
      return result;
    };

    const handleError = (error) => {
      if (errorHandler) { error = errorHandler(error); }
      if (debugMode) {
        log('Error: ', pd.json(error));
      }
      return error;
    };

    const sendRequest = payload => new Promise((resolve, reject) => {
      // Add Target Branch
      payload.attributes = payload.attributes || {};
      payload.attributes.TargetBranch = auth.targetBranch;
      service(payload, (error, result, rawResponse, soapHeader, rawRequest) => {
        if (error) {
          if (debugMode >= 2) {
            log('Request XML: \n', pd.xml(rawRequest));
            log('Response XML: \n', pd.xml(rawResponse || ''));
          }

          return reject(handleError(error));
        }

        if (debugMode >= 2) {
          log('Request XML: \n', pd.xml(rawRequest));
          log('Response XML: \n', pd.xml(rawResponse));
        }
        return resolve(result);
      }, options);
    });


    return validateInput()
      .then(requestParserFunction)
      .then(sendRequest)
      .then(responseParser)
      .then(handleSuccess);
  };
};
