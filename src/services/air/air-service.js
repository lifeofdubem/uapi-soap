const uApiRequest = require('../../request/uapi-request');
const validators = require('./air-validator');
const transformer = require('./air-transformer');
let { lowfareParser, airErrorParser, priceParser } = require('./air-parser');

module.exports = function service(settings) {
  const {
    auth, debug, options, client, noParse,
  } = settings;

  const {
    AirRepriceSearchPort,
    AirScheduleSearchPort,
    AirLowFareSearchPort,
    AirLowFareSearchAsynchPort,
    AirRetrieveLowFareSearchPort,
    AirPricePort,
    AirFareRulesPort,
    AirAvailabilitySearchPort,
    AirFareDisplayPort,
    SeatMapPort,
    AirRefundQuotePort,
    AirRefundTicketPort,
    AirTicketingPort,
    AirVoidDocumentPort,
    AirRetrieveDocumentBindingPort,
    AirExchangeProcessPort,
    AirExchangeQuotePort,
    AirExchangeMultiQuotePort,
    AirExchangeTicketingPort,
    AirMerchandisingOfferAvailabilityPort,
    AirUpsellSearchPort,
    FlightTimeTablePort,
    AirPrePayPort,
    EMDRetrievePort,
    EMDIssuancePort,
    AirMerchandisingDetailsPort,
    AirExchangeEligibilityPort,
  } = client.AirService;

  const {
    FlightInfoPort,
    FlightDetailsPort,
  } = client.FlightService;

  if (noParse) {
    lowfareParser = null;
    airErrorParser = null;
    priceParser = null;
  }
  return {
    searchLowFares: uApiRequest(
      AirLowFareSearchPort.service,
      auth,
      validators.lowfare,
      transformer.lowfareSearchTransformer,
      airErrorParser, // errorParse,
      lowfareParser, // responsePerser,
      debug,
      options,
    ),
    price: uApiRequest(
      AirPricePort.service,
      auth,
      validators.price,
      transformer.price,
      airErrorParser, // errorParse,
      priceParser, // responsePerser,
      debug,
      options,
    ),
  };
};
