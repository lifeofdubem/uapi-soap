const uAPI = require('../../index');
const config = require('../../test/testconfig');

uAPI.createAirService(
  {
    auth: config,
    debug: false,
    production: false,
  },
)
  .then(AirService => {
    const params = {
      legs: [
        {
          from: 'LWO',
          to: 'JKT',
          departureDate: '2019-07-19',
        },
        {
          from: 'JKT',
          to: 'IEV',
          departureDate: '2019-08-21',
        },
      ],
      passengers: {
        ADT: 1,
        /*
         CNN:1,
         INF: 1,
         INS: 1, //infant with a seat
         */
      },
      cabins: ['Economy'], // ['Business'],
      requestId: '4e2fd1f8-2221-4b6c-bb6e-cf05c367cf60',
      maxJourneyTime: 300,
      pricing: {
        currency: 'USD',
        // eTicketability: true,
      },
    };

    AirService.shop(params)
      .then(
        res => console.log(res),
        err => console.log(err),
      );
  })



