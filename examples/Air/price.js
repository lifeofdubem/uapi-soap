const uAPI = require('../../index');
const config = require('../../test/testconfig');

uAPI.createAirService({
  auth: config,
  debug: 2,
  production: false,
  parse: true,
  // options: { timeout: 1000 },
})
  .then((airService) => {
    const params = {
      segments: [],
    };

    airService.shop(params)
      .then(
        res => console.log(res),
        err => console.log(`Search Error: ${err}`),
      );
  })
  .catch(err => console.error('Unable To Create Service \n', err));
