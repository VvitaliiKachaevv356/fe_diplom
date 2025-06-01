import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { openModal } from '../../redux/modalSlice';
import './subscribeForm.css';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const modalContent = {
      type: 'warning',
      title: `На указанный Вами email (${email}) было отправлено письмо со ссылкой.`,
      text: 'Пожалуйста, перейдите по ней для подтверждения подписки.',
    };

    dispatch(openModal(modalContent)); // открываем модалочку
    setEmail(''); // очищаем форму
  };

  return (
    <form className="subscribe-form" onSubmit={handleSubmit}>
      <label className="subscribe-form__label visually-hidden">
        Подписаться
      </label>
      <input
        type="email"
        className="subscribe-form__input"
        placeholder="e-mail"
        required
        value={email}
        onChange={handleChange}
      />
      <button type="submit" className="subscribe-form__btn">
        Отправить
      </button>
    </form>
  );
};

export default SubscribeForm;
