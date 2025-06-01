import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import checkPassengerAge from '../../libs/checkPassengerAge';
import { AppDispatch, RootState } from '../../redux/store';
import {
  removePassengerFromList,
  setIsOpen,
  setIsDataValid,
} from '../../redux/passengersSlice';
import Birthdate from '../Birthdate/Birthdate';
import Documents from '../Documents/Documents';
import FullName from '../FullName/FullName';
import Gender from '../Gender/Gender';
import LimitedMobility from '../LimitedMobility/LimitedMobility';
import PassengersCheckFail from '../PassengersCheckFail/PassengersCheckFail';
import PassengersCheckSuccess from '../PassengersCheckSuccess/PassengersCheckSuccess';
import PassengersNotChecked from '../PassengersNotChecked/PassengersNotChecked';
import PassengerType from '../PassengerType/PassengerType';
import './articlePassenger.css';

const ArticlePassenger = ({ index }: { index: number }) => {
  const dispatch: AppDispatch = useDispatch();

  // получаем заготовку массива с пассажирами:
  const { passengersList } = useSelector(
    (state: RootState) => state.passengers
  );

  // деструктурируем данные конкретного пассажира:
  const { isOpen, isDataValid, data } = passengersList[index];

  // деструктурируем данные конкретного пассажира:
  const {
    type,
    lastName,
    firstName,
    middleName,
    gender,
    birthdate,
    limitedMobility,
    document,
    passportSeries,
    passportNumber,
    certificateNumber,
  } = data;

  const birthdateData = {
    index,
    birthdate,
  };

  // формируем пропсы:
  const documentsData = {
    index,
    document,
    passportSeries,
    passportNumber,
    certificateNumber,
  };

  const genderData = {
    index,
    gender,
  };

  const limitedMobilityData = {
    index,
    limitedMobility,
  };

  const nameData = {
    index,
    lastName,
    firstName,
    middleName,
  };

  const passengerTypeData = {
    index,
    type,
  };

  // проверка, что нет ошибок при валидации полей:
  const birthdateErr = birthdate.hasError;
  const lastNameErr = lastName.hasError;
  const firstNameErr = firstName.hasError;
  const middleNameErr = middleName.hasError;
  const passportSeriesErr = passportSeries.hasError;
  const passportNumberErr = passportNumber.hasError;
  const certificateNumberErr = certificateNumber.hasError;

  // несоответствие возраста пассажира указанному типу:
  const adultAgeErr =
    type === 'Взрослый' &&
    birthdate.isValid &&
    checkPassengerAge(birthdate.value, 18);

  const babyAgeErr =
    type === 'Без места' &&
    birthdate.isValid &&
    !checkPassengerAge(birthdate.value, 7);

  const childAgeErr =
    type === 'Детский' &&
    birthdate.isValid &&
    (!checkPassengerAge(birthdate.value, 18) ||
      checkPassengerAge(birthdate.value, 7));

  // несоответствие типа документа типу пассажира:
  const adultDocumentErr =
    type === 'Взрослый' && document === 'Свидетельство о рождении';

  const babyDocumentErr = type === 'Без места' && document === 'Паспорт РФ';

  const childDocumentErr =
    type === 'Детский' &&
    birthdate.isValid &&
    ((document === 'Свидетельство о рождении' &&
      !checkPassengerAge(birthdate.value, 14)) ||
      (document === 'Паспорт РФ' && checkPassengerAge(birthdate.value, 14)));

  // устанавливаем приоритет показа ошибок:
  const errorTypes = [
    { condition: lastNameErr || firstNameErr || middleNameErr, type: 'name' },
    { condition: birthdateErr, type: 'birthdate' },
    { condition: adultAgeErr, type: 'adultAge' },
    { condition: babyAgeErr, type: 'babyAge' },
    { condition: childAgeErr, type: 'childAge' },
    { condition: adultDocumentErr, type: 'adultDocument' },
    { condition: babyDocumentErr, type: 'babyDocument' },
    { condition: childDocumentErr, type: 'childDocument' },
    { condition: passportSeriesErr || passportNumberErr, type: 'passport' },
    { condition: certificateNumberErr, type: 'certificate' },
  ];

  // если нет ошибок, то получим undefined:
  const currentError = errorTypes.find((error) => error.condition)?.type;

  // проверка, что все поля заполнены данными:
  const isValid =
    birthdate.isValid &&
    lastName.isValid &&
    firstName.isValid &&
    middleName.isValid &&
    ((passportSeries.isValid && passportNumber.isValid) ||
      certificateNumber.isValid);

  useEffect(() => {
    // перезаписываем данные в store только в случае, если они не совпадают:
    if (isDataValid !== (!currentError && isValid)) {
      dispatch(setIsDataValid({ index, isDataValid: !isDataValid }));
    }
  }, [currentError, index, isDataValid, isValid, dispatch]);

  // обработчик скрытия/показа данных конкретного пассажира:
  const handleContentViewChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const payload = {
      index,
      isOpen: event.target.checked,
    };

    dispatch(setIsOpen(payload)); // ориентируемся на значение чекбокса
  };

  // обработчик удаления данных пассажира из массива 'passengersList' в store:
  const handleRemovePassengersData = () => {
    dispatch(removePassengerFromList(index));
  };

  return (
    <article id={`passenger-${index}`} className="passenger">
      <header className="passenger__header">
        <div className="passenger__left-wrapper">
          <input
            id={`passenger-checkbox-${index}`}
            type="checkbox"
            className="passenger__checkbox"
            onChange={handleContentViewChange}
            checked={isOpen}
          />
          <label
            htmlFor={`passenger-checkbox-${index}`}
            className="passenger__label"
          ></label>

          <h3 className="passenger__title">Пассажир {index + 1}</h3>
        </div>

        <div
          className="passenger__remove"
          onClick={handleRemovePassengersData}
        ></div>
      </header>

      <div
        className={
          isOpen
            ? 'passenger__content passenger__content_active'
            : 'passenger__content'
        }
      >
        <div className="passenger__main-data">
          <PassengerType {...passengerTypeData} />

          <div className="passenger__names">
            <FullName {...nameData} />
          </div>

          <div className="passenger__details">
            <Gender {...genderData} />
            <Birthdate {...birthdateData} />
          </div>

          <LimitedMobility {...limitedMobilityData} />
        </div>

        <Documents {...documentsData} />

        <div className="passenger__footer">
          {!currentError && !isValid && <PassengersNotChecked />}
          {!currentError && isValid && <PassengersCheckSuccess index={index} />}
          {currentError && (
            <PassengersCheckFail
              err={
                currentError as
                  | 'adultAge'
                  | 'babyAge'
                  | 'childAge'
                  | 'adultDocument'
                  | 'babyDocument'
                  | 'childDocument'
                  | 'birthdate'
                  | 'name'
                  | 'passport'
                  | 'certificate'
              }
            />
          )}
        </div>
      </div>
    </article>
  );
};

export default ArticlePassenger;
