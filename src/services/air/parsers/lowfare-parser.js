const getSegment = (key, segments) => {
  let segment = {};
  for (let i = 0; i < segments.length; i++) {
    if (key === segments[i].attributes.Key) {
      segment = segments[i].attributes;
      break;
    }
  }
  return segment;
};

const lowfareParser = ({
  attributes,
  FlightDetailsList: flightDetails,
  AirSegmentList: airSegments,
  FareInfoList: fareInfos,
  RouteList: routes,
  AirPricePointList: airPricePoints,
  BrandList: brands,
}) => {
  // TODO Verify response are return
  // Reset Attributes
  airPricePoints = airPricePoints.AirPricePoint;
  if (!Array.isArray(airPricePoints)) airPricePoints = [airPricePoints];

  airSegments = airSegments.AirSegment;

  const solutions = [];
  for (let s = 0; s < airPricePoints.length; s++) {
    const solution = {
      price: airPricePoints[s].AirPricingInfo.attributes,
      passengerFares: {},
      bookingComponents: airPricePoints[s].attributes,
      passengerCounts: airPricePoints[s].AirPricingInfo.PassengerType,
      penalties: {
        cancel: {
          applies: airPricePoints[s].AirPricingInfo.CancelPenalty.attributes.PenaltyApplies,
          noShow: airPricePoints[s].AirPricingInfo.CancelPenalty.attributes.NoShow,
          percentage: airPricePoints[s].AirPricingInfo.CancelPenalty.Percentage,
          amount: airPricePoints[s].AirPricingInfo.CancelPenalty.Amount,
        },
        change: {
          applies: airPricePoints[s].AirPricingInfo.ChangePenalty.attributes.PenaltyApplies,
          noShow: airPricePoints[s].AirPricingInfo.ChangePenalty.attributes.NoShow,
          percentage: airPricePoints[s].AirPricingInfo.ChangePenalty.Percentage,
          amount: airPricePoints[s].AirPricingInfo.ChangePenalty.Amount,
        },
      },
      fareCalc: airPricePoints[s].AirPricingInfo.FareCalc,
      directions: [],
    };

    // Map Directions
    let airDirections = airPricePoints[s].AirPricingInfo.FlightOptionsList.FlightOption;
    if (!Array.isArray(airDirections)) airDirections = [airDirections];
    for (let d = 0; d < airDirections.length; d++) {
      const options = [];

      // Map Options
      let airOptions = airDirections[d].Option;
      if (!Array.isArray(airOptions)) airOptions = [airOptions];
      for (let opt = 0; opt < airOptions.length; opt++) {
        const option = {
          from: airDirections[d].attributes.Origin,
          to: airDirections[d].attributes.Destination,
          platingCarrier: airPricePoints[s].AirPricingInfo.attributes.PlatingCarrier,
          segments: [],
        };

        // Map Segments
        let optionSegments = airOptions[opt].BookingInfo;
        if (!Array.isArray(optionSegments)) optionSegments = [optionSegments];
        for (let seg = 0; seg < optionSegments.length; seg++) {
          const segment = getSegment(optionSegments[seg].attributes.SegmentRef, airSegments);
          option.segments.push(segment);
        }

        options.push(option);
      }

      solution.directions.push(options);
    }

    solutions.push(solution);
  }
  return solutions;
};
module.exports = lowfareParser;
