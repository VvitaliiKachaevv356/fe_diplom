// функция определяет количество верхних и нижних мест в вагоне типа 'купе':
const getSeatTypesCountCompartment = (
  seats: { index: number; available: boolean }[]
): { top: number; bottom: number } => {
  let top = 0;
  let bottom = 0;

  seats.forEach((seat) => {
    if (seat.available) {
      if (seat.index % 2) {
        bottom++; // нечётные - нижние
      } else {
        top++; // чётные места - верхние
      }
    }
  });

  return { top, bottom };
};

export default getSeatTypesCountCompartment;
