const _ = require('lodash');
const transformers = require('./transformers');

module.exports = {

  lowfareSearchTransformer: (params) => {
    const request = {};
    _.assign(request, transformers.attributes(params));
    _.assign(request, transformers.billingPointOfSaleInfo(params));
    _.assign(request, transformers.legs(params));
    _.assign(request, transformers.airSearch(params));
    _.assign(request, transformers.searchPassenger(params));
    _.assign(request, transformers.airPricing(params));
    _.assign(request, transformers.pcc(params));


    return request;
  },

  price: (params) => {
    const request = {};
    _.assign(request, transformers.attributes(params));
    _.assign(request, transformers.billingPointOfSaleInfo(params));

    return request;
  },
};
