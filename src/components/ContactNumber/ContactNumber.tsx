import PhoneInput from 'react-phone-number-input'; // либа для телефонов -> маска + позиция курсора
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setPaymentPhoneNumber } from '../../redux/paymentSlice';
import 'react-phone-number-input/style.css'; // импорт стилей либы для телефонов
import './contactNumber.css';

interface IContactNumberProps {
  value: string;
  isValid: boolean;
  hasError: boolean;
}

const ContactNumber = ({ value, hasError }: IContactNumberProps) => {
  const dispatch: AppDispatch = useDispatch();

  const handleContactNumberChange = (value?: string) => {
    // если номер пустой ('+7' или '+'), и value === undefined, то очищаем store:
    if (!value) {
      const payload = {
        value: '',
        isValid: false,
        hasError: true,
      };

      dispatch(setPaymentPhoneNumber(payload));
      return;
    }

    // удаляем все символы, кроме цифр и ограничиваем длину до 11 цифр (для России с кодом страны):
    const cleanValue = value.replace(/\D/g, '').slice(0, 11);

    // цифры 7 и 8 в начале номера заменяем на '+7', перед остальными просто добавляем '+':
    const phoneNumber =
      cleanValue.startsWith('7') || cleanValue.startsWith('8')
        ? `+7${cleanValue.slice(1)}`
        : `+7${cleanValue}`;

    // проверяем номер на валидность:
    const isValid = /^\+7\d{10}$/.test(phoneNumber);

    // формируем payload для Redux:
    const payload = {
      value: phoneNumber,
      isValid,
      hasError: !isValid,
    };

    // отправляем данные в store:
    dispatch(setPaymentPhoneNumber(payload));
  };

  return (
    <div className="contact-number">
      <label htmlFor="contact-number" className="contact-number__label">
        Контактный телефон
      </label>

      <PhoneInput
        id="contact-number"
        className={`${hasError ? ' contact-number__input_invalid' : ''}`}
        placeholder="+7 999 123 45 67"
        international
        defaultCountry="RU" // по умолчанию -> Россия
        maxLength={16} // '+7 999 123 45 67'
        value={value}
        onChange={handleContactNumberChange}
      />
    </div>
  );
};

export default ContactNumber;
