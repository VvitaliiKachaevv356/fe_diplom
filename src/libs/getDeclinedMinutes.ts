const getDeclinedMinutes = (minutes: number) => {
  const lastDigit = minutes % 10;
  const lastTwoDigits = minutes % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return 'минута';
  }

  if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    (lastTwoDigits < 10 || lastTwoDigits >= 20)
  ) {
    return 'минуты';
  }

  return 'минут';
};

export default getDeclinedMinutes;
