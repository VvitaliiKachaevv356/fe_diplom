import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setPaymentEmail } from '../../redux/paymentSlice';
import './email.css';

interface IEmailProps {
  value: string;
  isValid: boolean;
  hasError: boolean;
}

const Email = ({ value, hasError }: IEmailProps) => {
  const dispatch: AppDispatch = useDispatch();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: currentValue } = event.target;

    // разрешаем ввод всех символов, допустимых в email:
    const filteredValue = currentValue.replace(/[^a-z\d@._%+-]/gi, '');

    // если данные не поменялись, нет смысла обновлять store:
    if (filteredValue === value) {
      return;
    }

    // проверяем валидность email с помощью регулярки:
    const startRegexp = '^[a-z\\d]'; // начало локальной части - строго буква или цифра
    const centerRegexp = '[a-z\\d._%+-]*[a-z\\d]'; // середина локальной части - допустимые символы
    const endRegexp = '@[a-z\\d.-]+\\.[a-z]{2,}$'; // доменная часть и доменная зона

    // объединяем все части в одну регулярку:
    const emailRegexp = new RegExp(startRegexp + centerRegexp + endRegexp, 'i');

    // применяем регулярку и исключаем вариант с двумя точками подряд:
    const isValid =
      emailRegexp.test(filteredValue) && !/\.\./.test(filteredValue);

    // формируем payload для Redux:
    const payload = {
      value: filteredValue,
      isValid,
      hasError: !isValid,
    };

    // отправляем данные в store:
    dispatch(setPaymentEmail(payload));
  };

  return (
    <div className="email">
      <label htmlFor="email" className="email__label">
        E-mail
      </label>

      <input
        id="email"
        className={`email__input${hasError ? ' email__input_invalid' : ''}`}
        type="email"
        placeholder="inbox@gmail.ru"
        required
        value={value}
        onChange={handleEmailChange}
      />
    </div>
  );
};

export default Email;
