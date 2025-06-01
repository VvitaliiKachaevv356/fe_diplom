import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import {
  setPassportSeries,
  setPassportNumber,
} from '../../redux/passengersSlice';
import './passport.css';

interface IPassportProps {
  index: number;
  passportSeries: { value: string; isValid: boolean; hasError: boolean };
  passportNumber: { value: string; isValid: boolean; hasError: boolean };
}

const Passport = (props: IPassportProps) => {
  const { index, passportSeries, passportNumber } = props;

  const dispatch: AppDispatch = useDispatch();

  // изменение серии паспорта:
  const handleSeriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;

    const cursorPosition = target.selectionStart || 0; // сохраняем текущую позицию курсора

    const filteredValue = value.replace(/\D/g, ''); // пропускаем только цифры

    // если данные не поменялись, нет смысла обновлять store:
    if (passportSeries.value === filteredValue) {
      return;
    }

    // проверяем полноту введенных данных:
    const isValid = filteredValue.length === 4;

    const payload = {
      index,
      value: filteredValue,
      isValid,
      hasError: !isValid,
    };

    // сохраняем в store данные серии паспорта:
    dispatch(setPassportSeries(payload));

    // восстанавливаем позицию курсора после обновления значения:
    setTimeout(() => {
      target.setSelectionRange(cursorPosition, cursorPosition);
    }, 0); // отложенная установка, чтобы избежать проблемы с перерисовкой
  };

  // изменение номера паспорта:
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;

    const cursorPosition = target.selectionStart || 0; // сохраняем текущую позицию курсора

    const filteredValue = value.replace(/\D/g, ''); // пропускаем только цифры

    // если данные не поменялись, нет смысла обновлять store:
    if (passportNumber.value === filteredValue) {
      return;
    }

    // проверяем полноту введенных данных:
    const isValid = filteredValue.length === 6;

    const payload = {
      index,
      value: filteredValue,
      isValid,
      hasError: !isValid,
    };

    // сохраняем в store данные номера паспорта:
    dispatch(setPassportNumber(payload));

    // восстанавливаем позицию курсора после обновления значения:
    setTimeout(() => {
      target.setSelectionRange(cursorPosition, cursorPosition);
    }, 0); // отложенная установка, чтобы избежать проблемы с перерисовкой
  };

  return (
    <>
      <div className="passport__column">
        <label htmlFor={`passport-series-${index}`} className="passport__label">
          Серия
        </label>
        <input
          id={`passport-series-${index}`} // уникальные for-id
          className={`passport__input${
            passportSeries.hasError ? ' passport__input_invalid' : ''
          }`}
          type="text"
          minLength={4}
          maxLength={4}
          placeholder="____"
          required
          value={passportSeries.value}
          onChange={handleSeriesChange}
        />
      </div>

      <div className="passport__column">
        <label htmlFor={`passport-number-${index}`} className="passport__label">
          Номер
        </label>
        <input
          id={`passport-number-${index}`}
          className={`passport__input${
            passportNumber.hasError ? ' passport__input_invalid' : ''
          }`}
          type="text"
          minLength={6}
          maxLength={6}
          placeholder="______"
          required
          value={passportNumber.value}
          onChange={handleNumberChange}
        />
      </div>
    </>
  );
};

export default Passport;
