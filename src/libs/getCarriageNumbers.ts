const getCarriageNumbers = (length: number) => {
  // массив с номерами всех вагонов в поезде с 1 по 15 -> [1, 2, 3, 4, 5, ..., 12, 13, 14, 15]:
  const carriageNumbers = [...Array(15)].map((_, index) => index + 1);

  // массив уникальных номеров:
  const uniqueCarriageNumbers = [...carriageNumbers];

  // перемешиваем массив (алгоритм Фишера-Йейтса):
  for (let i = uniqueCarriageNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [uniqueCarriageNumbers[i], uniqueCarriageNumbers[j]] = [
      uniqueCarriageNumbers[j],
      uniqueCarriageNumbers[i],
    ];
  }

  // берем первые элементы из перемешанного массива:
  const availableCarriageNumbersArray = uniqueCarriageNumbers.slice(0, length);

  return availableCarriageNumbersArray; // например, [13, 2, 9]
};

export default getCarriageNumbers;
