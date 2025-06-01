const getClassInfo = (
  departureSeats: number | undefined,
  arrivalSeats: number | undefined,
  departurePrices: {
    top_price?: number;
    bottom_price?: number;
    side_price?: number;
    price?: number;
  },
  arrivalPrices: {
    top_price?: number;
    bottom_price?: number;
    side_price?: number;
    price?: number;
  }
) => ({
  count: (departureSeats || 0) + (arrivalSeats || 0),
  minPrice: Math.min(
    departurePrices.top_price || +Infinity,
    departurePrices.bottom_price || +Infinity,
    departurePrices.side_price || +Infinity,
    departurePrices.price || +Infinity,
    arrivalPrices.top_price || +Infinity,
    arrivalPrices.bottom_price || +Infinity,
    arrivalPrices.side_price || +Infinity,
    arrivalPrices.price || +Infinity
  ),
  luxPrice: Math.min(
    departurePrices.price || +Infinity,
    arrivalPrices.price || +Infinity
  ),
  topPrice: Math.min(
    departurePrices.top_price || +Infinity,
    arrivalPrices.top_price || +Infinity
  ),
  bottomPrice: Math.min(
    departurePrices.bottom_price || +Infinity,
    arrivalPrices.bottom_price || +Infinity
  ),
  sidePrice: Math.min(
    departurePrices.side_price || +Infinity,
    arrivalPrices.side_price || +Infinity
  ),
});

export default getClassInfo;
