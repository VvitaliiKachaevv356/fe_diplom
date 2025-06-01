import fail from '../../assets/fail.svg';
import './passengersCheckFail.css';

interface IPassengersCheckFailProps {
  err:
    | 'adultAge'
    | 'babyAge'
    | 'childAge'
    | 'adultDocument'
    | 'babyDocument'
    | 'childDocument'
    | 'birthdate'
    | 'name'
    | 'passport'
    | 'certificate';
}

const PassengersCheckFail = ({ err }: IPassengersCheckFailProps) => {
  const typeError: Record<
    IPassengersCheckFailProps['err'],
    { text: string; example?: string }
  > = {
    adultAge: {
      text: 'Возраст взрослого должен быть в диапазоне от 18 до 110 лет.',
    },

    babyAge: {
      text: 'Возраст младенца должен быть в диапазоне от 0 до 7 лет.',
    },

    childAge: {
      text: 'Возраст ребёнка должен быть в диапазоне от 7 до 18 лет.',
    },

    adultDocument: {
      text: 'Для взрослого пассажира необходимо указать данные паспорта РФ.',
    },

    babyDocument: {
      text: 'Для младенцев необходимо указать данные свидетельства о рождении.',
    },

    childDocument: {
      text: 'Для детей до 14 лет укажите данные свидетельства о рождении. Для детей от 14 до 18 лет укажите данные паспорта.',
    },

    name: {
      text: 'Данные ФИО указаны неверно.',
      example: 'Иванов Иван Иванович',
    },

    birthdate: {
      text: 'Дата рождения указана неверно. Проверьте, пожалуйста, саму дату и её формат.',
      example: '01.01.1997',
    },

    passport: {
      text: 'Номер паспорта указан некорректно.',
      example: '1234 123456',
    },

    certificate: {
      text: 'Номер свидетельства о рождении указан некорректно.',
      example: 'VII-ЫП-123456',
    },
  };

  const currentError = typeError[err];

  return (
    <div className="passengers-check_fail">
      <img className="passengers-check__icon_fail" src={fail} alt="fail" />

      <div className="passengers-check__wrapper_fail">
        <div className="passengers-check__reason">{currentError.text}</div>

        {currentError.example && (
          <div className="passengers-check__example">
            Пример:
            <span className="passengers-check__current-example">
              {' ' + currentError.example}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PassengersCheckFail;
