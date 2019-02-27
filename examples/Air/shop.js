const uAPI = require('../../index');
const config = require('../../test/testconfig');

uAPI.createAirService({
  auth: config,
  debug: 2,
  production: false,
  parse: true,
  options: { timeout: 1000 },
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
        adt: 1, // Adult Passanger
        cnn: 0, // Child Passanger. Use array to add passanger age
        // cnn: [
        //   { age: 5 },
        //   { age: 12 },
        //   { age: 13 }, // Invalide age must be between 2 and 11 inclusive. Defaults to 9
        // ],
        inf: 0, // Infant Passanger
        // inf: [
        //   { age: 0 },
        //   { age: 1 },
        // ],
        ins: 0, // infant with a seat. Use array to add passanger age
        // ins: [
        //   { age: 0 },
        //   { age: 1 },
        // ],

      },
      pricing: {
        currency: 'USD',
        eTicketability: 'Yes', // Request a search based on whether only E-ticketable fares are required. ['Yes', 'No', 'Required,', 'Ticketless'];
        sellCheck: true, // Checks if the segment is bookable before pricing
        pcc: 'PCC',

        // promoCodes: [{
        //   code: 'Code', // Required. To be used to specify Promotional Code.
        //   provider: 'Provid1erCode', // Required. To be used to specify Provider Code.
        //   supplier: 'SupplierCode', // Required. To be used to specify Supplier Cod
        // }],
      },
      modifiers: {
        cabins: ['Economy'], // Permitted Cabin for entire solution ['Economy', 'Business', 'First', 'PremiumEconomy', 'PremiumFirst'], Overwriten by leg cabin

        maxJourneyTime: 99, // 	Maximum Journey Time for all legs (in hours) 0-99
        maxConnectionTime: 99, //	The maximum anount of time (in minutes) that a solution can contain for connections between flights.
        preferNonStop: true, // The search request will ‘boost' the preference towards non-stops. If true then Non Stop flights will be preferred.
        distanceUnit: 'KM',
        includeExtraSolutions: true, // IF true then defaults to searchWeekends=true  regardless of it value
        searchWeekends: true, // IF true then defaults to searchWeekends=true  regardless of it value,
        maxResults: 15, // The maximum number of solutions to return.
        maxStops: -1, // The maximum number of stops within a connection.
        // nonStop: true, // Search only non stop flight
        returnUpsellFare: true,
        language: 'FR', // ISO 639 two-character language codes are used to retrieve specific information in the requested languag
        // carriers: ['TK', 'KL'],
        traceId: 't4e2fd1f8-2221-4b6c-bb6e-cf05c367cf60race',
        pos: 'My App',
        authorizedBy: 'uAPI',
        logLevel: 'TRACE', // TRACE , DEBUG , INFO , WARN , ERROR , FATAL Use to override the default logging level
        solutionResult: true, // Provider: 1G,1V,1P,1J,ACH-Indicates whether the response will contain Solution result (AirPricingSolution) or Non Solution Result (AirPricingPoints)
      },
    };

    airService.shop(params)
      .then(
        res => console.log(res),
        err => console.log(`Search Error: ${err}`),
      );
  })
  .catch(err => console.error('Unable To Create Service \n', err));
