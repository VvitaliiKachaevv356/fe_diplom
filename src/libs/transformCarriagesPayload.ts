import getCarriageNumbers from './getCarriageNumbers';
import getSeatTypesCountCompartment from './getSeatTypesCountCompartment';
import getSeatTypesCountPlatzkart from './getSeatTypesCountPlatzkart';
import transformCarriageSeats from './transformCarriageSeats';
import { ICarriage } from '../models/models';

const transformCarriagesPayload = (payload: ICarriage[]) => {
  // 1. создадим клон для преобразования полученных данных от сервера:
  const newPayload = JSON.parse(JSON.stringify(payload));

  // 2. добавим в каждый объект поле 'carriage_number' для номера вагона:
  const carriageNumbersArray = getCarriageNumbers(newPayload.length); // [13, 2, 9]

  newPayload.map(
    (item: ICarriage, index: number) =>
      (item.coach.carriage_number = carriageNumbersArray[index]) // 13
  );

  // 3. отсортируем массив вагонов сначала по 'class_type', затем - по 'carriage_number':
  const classPriority = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
  };

  newPayload.sort((a: ICarriage, b: ICarriage) => {
    // уточнения для typescript:
    const classA: keyof typeof classPriority = a.coach
      .class_type as keyof typeof classPriority;

    const classB: keyof typeof classPriority = b.coach
      .class_type as keyof typeof classPriority;

    // сначала сортируем по полю 'class_type':
    const classTypeComparison = classPriority[classA] - classPriority[classB];

    if (classTypeComparison !== 0) {
      // если классы разные, то сортируем только по полю 'class_type':
      return classTypeComparison;
    }

    // если классы одинаковые, то дополнительно сортируем по полю 'carriage_number':
    return a.coach.carriage_number - b.coach.carriage_number;
  });

  // 4. преобразуем номера доступныx мест:
  newPayload.map(
    (item: ICarriage) =>
      (item.seats = transformCarriageSeats(
        item.coach.class_type, // класс вагона
        item.coach.available_seats // количество доступных мест
      ))
  );

  // 5. добавим поля с количеством мест определенного типа (верхние, нижние, боковые):
  newPayload.map((item: ICarriage) => {
    // для люкса и сидячего вагона нет смысла определять дополнительные поля
    if (item.coach.class_type === 'second') {
      const seatTypes = getSeatTypesCountCompartment(item.seats); // передаем ISeat[]
      item.coach.top = seatTypes.top; // количество верхних мест в купе
      item.coach.bottom = seatTypes.bottom; // количество нижних мест в купе
    } else if (item.coach.class_type === 'third') {
      const seatTypes = getSeatTypesCountPlatzkart(item.seats); // передаем ISeat[]
      item.coach.top = seatTypes.top; // количество верхних мест в купе
      item.coach.bottom = seatTypes.bottom; // количество нижних мест в купе
      item.coach.side = seatTypes.side; // количество боковых мест в платцкарте
    }
  });

  return newPayload;
};

export default transformCarriagesPayload;
