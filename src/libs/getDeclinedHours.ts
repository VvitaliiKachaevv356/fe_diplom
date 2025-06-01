const getDeclinedHours = (hours: number) => {
  const lastDigit = hours % 10;
  const lastTwoDigits = hours % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return 'час';
  }

  if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    (lastTwoDigits < 10 || lastTwoDigits >= 20)
  ) {
    return 'часа';
  }

  return 'часов';
};

export default getDeclinedHours;
