import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { openModal } from '../../redux/modalSlice';
import { sendOrder } from '../../redux/orderSlice';
import useGetFinalData from '../../hooks/useGetFinalData';
import ArticleCheckPassengers from '../ArticleCheckPassengers/ArticleCheckPassengers';
import ArticleCheckPayment from '../ArticleCheckPayment/ArticleCheckPayment';
import ArticleCheckTrain from '../ArticleCheckTrain/ArticleCheckTrain';
import NextPage from '../NextPage/NextPage';
import './sectionConfirmation.css';

const SectionConfirmation = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { orderIsLoading, orderHasError } = useSelector(
    (state: RootState) => state.order
  );

  const data = useGetFinalData(); // получаем данные через кастомных хук

  const handleOnNextClick = async () => {
    // передаем строку! с данными:
    await dispatch(sendOrder(JSON.stringify(data)));

    if (!orderIsLoading) {
      // eсли запрос успешен, то навигируемся далее :
      if (!orderHasError) {
        navigate('/order');
      } else {
        // если ошибка при отправке данных, то всплывает модалочка:
        const modalOptions = {
          type: 'error',
          title: 'Произошла ошибка при отправке данных на сервер!',
          text: 'Попробуйте повторить ваш запрос позже!',
        };

        dispatch(openModal(modalOptions));
      }
    }
  };

  return (
    <section className="confirmation">
      <h2 className="visually-hidden">Подтверждение заказа</h2>
      <ArticleCheckTrain />
      <ArticleCheckPassengers />
      <ArticleCheckPayment />
      <NextPage
        text="подтвердить"
        isActive={true}
        onNextClick={handleOnNextClick}
      />
    </section>
  );
};

export default SectionConfirmation;
