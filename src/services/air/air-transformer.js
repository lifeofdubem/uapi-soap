const _ = require('lodash');
const transformers = require('./transformers');

module.exports = {

  lowfareSearchTransformer: (params) => {
    const request = {};
    _.assign(request, transformers.lowfarAttributes(params));
    _.assign(request, transformers.billingPointOfSaleInfo(params));
    _.assign(request, transformers.legs(params));
    _.assign(request, transformers.airSearchModifiers(params));
    _.assign(request, transformers.searchPassenger(params));
    _.assign(request, transformers.airPricingModifiers(params));


    return request;
  },
};
