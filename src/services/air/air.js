const serviceConfig = require('../../config');
const creatClient = require('../create-service');
const airService = require('./air-service');

module.exports = (setting) => {
  const endpoints = serviceConfig(setting.region, setting.production);

  return creatClient('Air', setting.auth, { endpoint: endpoints.AirService.url, useEmptyTag: true })
    .then((client) => {
      setting.client = client;

      const service = airService(setting);

      return {
        shop(options) {
          options.provider = setting.auth.provider || '1G';
          options.pcc = setting.auth.pcc;

          return service.searchLowFares(options);
        },
        price(options) {
          options.provider = setting.auth.provider || '1G';
          options.pcc = setting.auth.pcc;

          return service.price(options);
        },
      };
    });
};
