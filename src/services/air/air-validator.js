const validators = require('./validators');

module.exports = {
  lowfare: (params) => {
    // Validate Params
    validators.legs(params);
    validators.passangers(params);

    return params;
  },
  price: params => params,
};
