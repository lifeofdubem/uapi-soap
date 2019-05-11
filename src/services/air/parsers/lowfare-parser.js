const _ = require('lodash');

const penalityParser = (penality) => {
  let penalities = {};

  if (penality) {
    if (penality.attributes) {
      penalities = {
        applies: penality.attributes.PenaltyApplies,
        noShow: penality.attributes.NoShow,
        percentage: penality.Percentage,
        amount: penality.Amount,
      };
    } else {
      penalities = {
        percentage: penality.Percentage,
        amount: penality.Amount,
      };
    }
  }

  return penalities;
};

const priceParser = ({
  Key: key,
  ApproximateTotalPrice: totalPrice,
  ApproximateBasePrice: basePrice,
  Taxes: taxes,
  LatestTicketingTime: latestTicketingTime,
  PricingMethod: pricingMethod,
  Refundable: refundable,
  ETicketability: eTicketability,
  PlatingCarrier: platingCarrier,
  Cat35Indicator: cat35Indicator,
}) => ({
  key,
  totalPrice,
  basePrice,
  taxes,
  latestTicketingTime,
  pricingMethod,
  refundable,
  eTicketability,
  platingCarrier,
  cat35Indicator,
});

const passengerFareParser = (airPricingInfos) => {
  const prices = {};
  airPricingInfos.forEach((airPricingInfo) => {
    // const passengerType = airPricingInfo.PassengerType[0].attributes.Code.toLowerCase();
    const passengers = (!Array.isArray(airPricingInfo.PassengerType)
      ? [airPricingInfo.PassengerType] : airPricingInfo.PassengerType);
    const passengerType = passengers[0].attributes.Code.toLowerCase();
    prices[passengerType] = priceParser(airPricingInfo.attributes);
    prices[passengerType].count = passengers.length;
  });
  return prices;
};

const segmentParser = ({
  Key: key,
  Group: group,
  Carrier: carrier,
  FlightNumber: flightNumber,
  Origin: origin,
  Destination: destination,
  DepartureTime: departureTime,
  ArrivalTime: arrivalTime,
  FlightTime: flightTime,
  Distance: distance,
  ETicketability: eTicketability,
  Equipment: plane,
  ChangeOfPlane: changeOfPlane,
  ParticipantLevel: participantLevel,
  LinkAvailability: linkAvailability,
  PolledAvailabilityOption: polledAvailabilityOption,
  OptionalServicesIndicator: optionalServicesIndicator,
  AvailabilitySource: availabilitySource,
  AvailabilityDisplayType: availabilityDisplayType,
}) => ({
  key,
  origin,
  destination,
  group,
  carrier,
  flightNumber,
  departureTime,
  arrivalTime,
  flightTime,
  distance,
  eTicketability,
  plane,
  changeOfPlane,
  participantLevel,
  linkAvailability,
  polledAvailabilityOption,
  optionalServicesIndicator,
  availabilitySource,
  availabilityDisplayType,
});

const fareParser = ({
  BaggageAllowance: baggageAllowance = {},
  attributes: { Key: uapiFareRef, FareBasis: fareBasis },
}) => {
  const baggage = {
    numberOfPieces: baggageAllowance.NumberOfPieces,
    maxWeight: {},
  };
  if (baggageAllowance.MaxWeight) {
    _.assign(baggage.maxWeight, {
      value: baggageAllowance.MaxWeight.attributes.Value,
      unit: baggageAllowance.MaxWeight.attributes.Unit,
    });
  }
  return { uapiFareRef, fareBasis, baggage };
};
const lowfareParser = ({
  attributes: {
    TraceId: traceId,
    TransactionId: transactionId,
    CurrencyType: currency,
    ResponseTime: responseTime,
    DistanceUnits: distanceUnits,
  },
  // FlightDetailsList: flightDetails,
  AirSegmentList: { AirSegment: airSegments },
  FareInfoList: { FareInfo: fareInfos },
  // RouteList: routes,
  AirPricePointList: { AirPricePoint: airPricePoints },
  // BrandList: brands,
  NextResultReference: nextResultReference,
}) => {
  // TODO Verify response are return
  if (!airPricePoints || !airSegments || !fareInfos) {
    throw new Error('UAPI lowfare  response invalid');
  }
  // Ensure it is an array, because UAPI returns an object if single instance is available
  airPricePoints = !Array.isArray(airPricePoints) ? [airPricePoints] : airPricePoints;
  airSegments = !Array.isArray(airSegments) ? [airSegments] : airSegments;
  fareInfos = !Array.isArray(fareInfos) ? [fareInfos] : fareInfos;

  const segments = {};
  airSegments.forEach((segment) => {
    segments[segment.attributes.Key] = segmentParser(segment.attributes);
  });
  const fares = {};
  fareInfos.forEach((fare) => {
    fares[fare.attributes.Key] = fareParser(fare);
  });

  const results = [];
  airPricePoints.forEach(({ AirPricingInfo: airPricingInfos, attributes: price }) => {
    airPricingInfos = !Array.isArray(airPricingInfos) ? [airPricingInfos] : airPricingInfos;

    const result = {
      price: priceParser(price),
      passengerFare: passengerFareParser(airPricingInfos),
      penalties: {
        cancel: penalityParser(airPricingInfos[0].CancelPenalty),
        change: penalityParser(airPricingInfos[0].ChangePenalty),
      },
      fareCalc: airPricingInfos[0].FareCalc,
      directions: [],
    };

    // Map Directions
    let airDirections = airPricingInfos[0].FlightOptionsList.FlightOption;
    if (!Array.isArray(airDirections)) airDirections = [airDirections];
    airDirections.forEach((airDirection) => {
      const options = [];

      // Map Options
      let airOptions = airDirection.Option;
      if (!Array.isArray(airOptions)) airOptions = [airOptions];
      airOptions.forEach((airOption) => {
        const option = {
          origin: airDirection.attributes.Origin,
          destination: airDirection.attributes.Destination,
          platingCarrier: airPricingInfos[0].attributes.PlatingCarrier,
          travelTime: airOption.attributes.TravelTime,
          segments: [],
        };

        // Map Segments
        let optionSegments = airOption.BookingInfo;
        if (!Array.isArray(optionSegments)) optionSegments = [optionSegments];
        optionSegments.forEach((optionSegment) => {
          const segment = segments[optionSegment.attributes.SegmentRef];
          _.assign(segment, {
            cabinClass: optionSegment.attributes.CabinClass,
            seats: optionSegment.attributes.BookingCount,
          });
          _.assign(segment, fares[optionSegment.attributes.FareInfoRef]);
          option.segments.push(segment);
        });

        options.push(option);
      });

      result.directions.push(options);
    });

    results.push(result);
  });// End airPricePoints.forEach

  return {
    traceId,
    transactionId,
    responseTime,
    distanceUnits,
    currency,
    nextResultReference,
    results,
  };
};
module.exports = lowfareParser;
