import { isAfter, isBefore, isValid, parse, subYears } from 'date-fns';

const checkPassengerAge = (date: string, age: number) => {
  const parsedDate = parse(date, 'dd.MM.yyyy', new Date()); // проверяем формат ДД.ММ.ГГГГ
  const today = new Date(); // дата - сегодня
  const minDate = subYears(today, age); // дата - 'age' лет назад

  // проверяем, является ли дата валидной и входит ли в заданный диапазон:
  const isValidDate =
    isValid(parsedDate) &&
    isBefore(parsedDate, today) &&
    isAfter(parsedDate, minDate);

  return isValidDate;
};

export default checkPassengerAge;
