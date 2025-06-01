// функция определяет количество верхних, нижних и боковых мест в вагоне типа 'платцкарт':
const getSeatTypesCountPlatzkart = (
  seats: { index: number; available: boolean }[]
): { top: number; bottom: number; side: number } => {
  let top = 0;
  let bottom = 0;
  let side = 0;

  seats.forEach((seat) => {
    if (seat.available) {
      if (seat.index < 33) {
        if (seat.index % 2) {
          bottom++; // нечётные - нижние
        } else {
          top++; // чётные места - верхние
        }
      } else {
        side++; // места с 33 по 48 - боковые
      }
    }
  });

  return { top, bottom, side };
};

export default getSeatTypesCountPlatzkart;
