const uApiRequest = require('../../request/uapi-request');
const parsers = require('./air-parser');
const validators = require('./air-validator');


module.exports = function (settings) {
  const {
    auth, debug, options, client,
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
  return {
    searchLowFares: uApiRequest(
      AirLowFareSearchPort.service,
      auth,
      validators.lowfare,
      parsers.airErrors, // errorParse,
      parsers.lowfareParser, // responsePerser,
      debug,
      options,
    ),
  };
};
