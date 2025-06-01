import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import {
  setFirstName,
  setLastName,
  setMiddleName,
} from '../../redux/passengersSlice';
import {
  setPaymentFirstName,
  setPaymentLastName,
  setPaymentMiddleName,
} from '../../redux/paymentSlice';
import './fullName.css';

interface IFullNameProps {
  index: number;
  firstName: { value: string; isValid: boolean; hasError: boolean };
  lastName: { value: string; isValid: boolean; hasError: boolean };
  middleName: { value: string; isValid: boolean; hasError: boolean };
}

const FullName = (props: IFullNameProps) => {
  const { index, firstName, lastName, middleName } = props;
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation(); // '/passengers' или '/payment'

  // массив данных для рендеринга полей:
  const renderData = [
    {
      label: 'Фамилия',
      id: `last-name-${index}`,
      name: 'last-name',
      value: lastName.value,
      hasError: lastName.hasError,
    },
    {
      label: 'Имя',
      id: `first-name-${index}`,
      name: 'first-name',
      value: firstName.value,
      hasError: firstName.hasError,
    },
    {
      label: 'Отчество',
      id: `middle-name-${index}`,
      name: 'middle-name',
      value: middleName.value,
      hasError: middleName.hasError,
    },
  ];

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value, name } = target;

    const cursorPosition = target.selectionStart || 0; // сохраняем текущую позицию курсора

    // разрешаем ввод только кириллических букв:
    const filteredValue = value.replace(/[^А-Я]/gi, '').toUpperCase();

    // определяем на каком из полей ввода сработало событие 'change':
    const field = renderData.find((item) => item.name === name);

    // если данные не поменялись, нет смысла обновлять store:
    if (!field || field.value === filteredValue) {
      return;
    }

    // проверяем полноту введенных данных:
    const isValid = /^[А-Я]{2,50}$/.test(filteredValue);

    const payload = {
      value: filteredValue,
      isValid,
      hasError: !isValid,
    };

    // мы находимся либо на роуте '/passengers' либо на роуте '/payment':
    const isPassengersRoute = location.pathname.endsWith('/passengers');

    // обновляем данные в store в зависимости от роута:
    switch (name) {
      case 'last-name':
        dispatch(
          isPassengersRoute
            ? setLastName({ ...payload, index })
            : setPaymentLastName(payload)
        );
        break;
      case 'first-name':
        dispatch(
          isPassengersRoute
            ? setFirstName({ ...payload, index })
            : setPaymentFirstName(payload)
        );
        break;
      case 'middle-name':
        dispatch(
          isPassengersRoute
            ? setMiddleName({ ...payload, index })
            : setPaymentMiddleName(payload)
        );
    }

    // восстанавливаем позицию курсора после обновления значения:
    setTimeout(() => {
      target.setSelectionRange(cursorPosition, cursorPosition);
    }, 0); // отложенная установка, чтобы избежать проблемы с перерисовкой
  };

  return (
    <div className="full-name">
      {renderData.map(({ label, id, name, value, hasError }) => (
        <div key={id} className="full-name__column">
          <label htmlFor={id} className="full-name__label">
            {label}
          </label>
          <input
            id={id}
            type="text"
            name={name}
            className={`full-name__input${
              hasError ? ' full-name__input_invalid' : ''
            }`}
            minLength={2}
            maxLength={50}
            required
            value={value}
            onChange={handleNameChange}
          />
        </div>
      ))}
    </div>
  );
};

export default FullName;
