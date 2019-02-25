const soap = require('soap');
const path = require('path');
const { RequestValidationError } = require('../request/RequestErrors');

module.exports = (serviceName, auth, options) => {
  // eslint-disable-next-line no-param-reassign
  options.version = options.version || 'v47_0';
  const wsdl = path.join(__dirname, '../../', 'wsdl', `${serviceName.toLowerCase()}_${options.version}`, `${serviceName}.wsdl`);

  if (!auth || auth.username === undefined || auth.password === undefined) {
    throw new RequestValidationError.AuthDataMissing();
  }
  return soap.createClientAsync(wsdl, options)
    .then((client) => {
      const { username, password } = auth;
      client.setSecurity(new soap.BasicAuthSecurity(username, password));
      return client;
    });
};
