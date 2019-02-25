const uApiRequest = require('../../request/uapi-request');
let { lowfareParser, airErrorParser } = require('./air-parser');
const validators = require('./air-validator');


module.exports = function service(settings) {
  const {
    auth, debug, options, client, parse,
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

  if (!parse) {
    lowfareParser = null;
    airErrorParser = null;
  }
  return {
    searchLowFares: uApiRequest(
      AirLowFareSearchPort.service,
      auth,
      validators.lowfare,
      airErrorParser, // errorParse,
      lowfareParser, // responsePerser,
      debug,
      options,
    ),
  };
};
