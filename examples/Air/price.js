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
      legs: [
        {
          from: 'LOS',
          to: 'NYC',
          departureDate: '2019-06-10', // Any Valid JS Date format
          cabins: ['Economy'], // Permitted cabin class for this leg
        },
        {
          from: 'NYC',
          to: 'LOS',
          departureDate: 'Aug 25, 2019',
          cabins: ['Economy'],

        },
      ],
      passengers: {
        adt: 1,
      },
    };

    airService.shop(params)
      .then((results) => {
        const forwardSegments = results['0'].directions['0']['0'].segments;
        const backSegments = results['0'].directions['1']['0'].segments;

        const farerulesParams = {
          segments: forwardSegments.concat(backSegments),
          passengers: params.passengers,
          long: true,
          requestId: 'test',
        };

        return airService.airPrice(farerulesParams);
      })
      .then((airPrice) => {
        console.log(airPrice);
      })
      .catch(err => console.log(err));
  });
