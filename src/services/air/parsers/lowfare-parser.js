
const mapSegments = (airSegment, bookingInfo) => {
  const segments = airSegment.filter(segment => (
    segment.attributes.Key === bookingInfo.attributes.SegmentRef));
  // const segments = [];
  // airSegment.forEach((segment) => {
  //   if (segment.attributes.Key == bookingInfo.attributes.SegmentRef) {
  //  segments.push(segment.attributes);
  // }
  // });
  return segments;
};
const mapOptions = (flightOptions, airSegment) => {
  const option = {};
  let segments = [];
  flightOptions.BookingInfo.forEach((bookingInfo) => {
    segments = mapSegments(airSegment, bookingInfo);
  });
  option.segments = segments;
  return option;
};
const mapDirections = (flightOption, airSegment) => {
  const { attributes } = flightOption;
  let { Option: options } = flightOption;

  // const direction = [];
  // const directionSolution = {};
  // directionSolution.from = attributes.Origin;
  // directionSolution.to = attributes.Destination;
  if (!Array.isArray(options)) options = [options];
  const directions = options.map(option => mapOptions(option, airSegment));

  return directions;
};

module.exports = ({
  attributes,
  FlightDetailsList,
  AirSegmentList,
  FareInfoList,
  RouteList,
  AirPricePointList,
  BrandList,
}) => {
  const solutions = [];
  AirPricePointList.AirPricePoint.forEach((pricePoint) => {
    const solution = {};
    let { FlightOption: flightOption } = pricePoint.AirPricingInfo.FlightOptionsList;
    if (!Array.isArray(flightOption)) flightOption = [flightOption];

    const directions = flightOption.map(option => mapDirections(option, AirSegmentList.AirSegment));

    solution.directions = directions;
    solutions.push(solution);
  });
  return solutions;
};
