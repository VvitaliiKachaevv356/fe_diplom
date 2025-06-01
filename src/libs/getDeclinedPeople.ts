const getDeclinedPeople = (count: number) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    (lastTwoDigits < 10 || lastTwoDigits >= 20)
  ) {
    return 'человека';
  }

  return 'человек';
};

export default getDeclinedPeople;
