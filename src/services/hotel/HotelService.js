
module.exports = function (settings) {
  const {
    auth, debug, production, options, client,
  } = settings;
  const {
    HotelSearchServicePort,
    HotelMediaLinksServicePort,
    HotelDetailsServicePort,
    HotelRetrieveServicePort,
    HotelRulesServicePort,
    HotelUpsellSearchServicePort,
    HotelSearchAvailabilityAsynchServicePort,
    HotelKeywordsServicePort,
    HotelSuperShopperServicePort,
    RetrieveHotelSearchAvailabilityServicePort,
  } = client.HotelService;
  return {
    shop: 'Coming soon',
  };
};
