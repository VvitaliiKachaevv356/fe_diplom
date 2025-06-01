import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { openModal } from '../../redux/modalSlice';
import ContactNumber from '../ContactNumber/ContactNumber';
import Email from '../Email/Email';
import FullName from '../FullName/FullName';
import NextPage from '../NextPage/NextPage';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import './sectionPayment.css';

const SectionPayment = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  // получаем данные плательщика из store:
  const { lastName, firstName, middleName, phoneNumber, email, cash } =
    useSelector((state: RootState) => state.payment);

  // формируем пропсы для передачи их в компонент FullName:
  const nameData = {
    index: -1, // рандомное число, которое не будет пересекаться с индексами на роуте '/passengers'
    lastName,
    firstName,
    middleName,
  };

  // проверка, что нет ошибок при валидации полей:
  const lastNameErr = lastName.hasError;
  const firstNameErr = firstName.hasError;
  const middleNameErr = middleName.hasError;
  const phoneNumberErr = phoneNumber.hasError;
  const emailErr = email.hasError;

  const currentError =
    lastNameErr || firstNameErr || middleNameErr || phoneNumberErr || emailErr;

  // проверка, что все поля заполнены данными:
  const isValid =
    lastName.isValid &&
    firstName.isValid &&
    middleName.isValid &&
    phoneNumber.isValid &&
    email.isValid;

  const handleOnNextClick = () => {
    if (currentError || !isValid) {
      const modalOptions = {
        type: 'warning',
        title: 'В данных плательщика имеются ошибки или не все поля заполнены!',
        text: 'Пожалуйста, перепроверьте полноту и валидность введённых данных!',
      };

      dispatch(openModal(modalOptions));
    } else {
      navigate('/confirmation'); // если все условия выполнены, то навигируемся на след. роут
    }
  };

  return (
    <section className="payment">
      <h2 className="visually-hidden">Оплата</h2>

      <div className="payment__info">
        <article className="payment__payer">
          <h3 className="payment__title">Персональные данные</h3>
          <div className="payment__payer-data">
            <FullName {...nameData} />
            <ContactNumber {...phoneNumber} />
            <Email {...email} />
          </div>
        </article>

        <PaymentMethod cash={cash} />
      </div>

      <NextPage
        text="купить билеты"
        isActive={!currentError && isValid}
        onNextClick={handleOnNextClick}
      />
    </section>
  );
};

export default SectionPayment;
