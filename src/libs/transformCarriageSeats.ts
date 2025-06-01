// функция генерирует массив мест, длиной maxCount и количеством доступных мест availableCount:
const transformCarriageSeats = (classType: string, availableCount: number) => {
  let maxCount = availableCount; // чтобы случайно не превысить количество возможных мест

  // определение максимального числа мест в зависимости от класса вагона:
  switch (classType) {
    case 'first':
      maxCount = 16;
      break;
    case 'second':
      maxCount = 32;
      break;
    case 'third':
      maxCount = 48;
      break;
    case 'fourth':
      maxCount = 62;
      break;
  }

  // создаем массив мест с индексацией:
  const availableSeatsArray = Array.from({ length: maxCount }, (_, index) => ({
    index: index + 1, // индексы с 1
    available: false, // изначально все места не доступны
    isActive: false, // изначально все места не выбраны
  }));

  // генерируем массив индексов от 0 до maxCount - 1:
  const indices = [...Array(maxCount).keys()];

  // перемешиваем массив индексов случайным образом (метод Фишера-Йейтса):
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]]; // меняем местами элементы
  }

  // выбираем первые availableCount индексов:
  const availableIndexes = indices.slice(0, availableCount);

  // обновляем массив доступных мест:
  availableSeatsArray.forEach((seat, index) => {
    if (availableIndexes.includes(index)) {
      seat.available = true;
    }
  });

  return availableSeatsArray;
};

export default transformCarriageSeats;
