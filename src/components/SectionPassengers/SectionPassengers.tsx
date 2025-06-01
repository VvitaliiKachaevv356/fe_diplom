import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { openModal } from '../../redux/modalSlice';
import AddPassenger from '../AddPassenger/AddPassenger';
import ArticlePassenger from '../ArticlePassenger/ArticlePassenger';
import NextPage from '../NextPage/NextPage';
import './sectionPassengers.css';

const SectionPassengers = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { passengersList } = useSelector(
    (state: RootState) => state.passengers
  );

  const { orderList } = useSelector((state: RootState) => state.departure);

  const hasValidCountOfPassengers = orderList.length === passengersList.length;

  const hasFullValidData = passengersList.reduce((acc, passenger) => {
    return acc && passenger.isDataValid;
  }, true);

  // подсчитываем количество пассажиров каждого типа в `passengersList`:
  const countsFromPassengersList = passengersList.reduce(
    (acc, passenger) => {
      const type = passenger.data.type;
      if (type === 'Взрослый') {
        acc.adults++;
      } else if (type === 'Детский') {
        acc.children++;
      } else {
        acc.babies++;
      }
      return acc;
    },
    { adults: 0, children: 0, babies: 0 }
  );

  // подсчитываем количество пассажиров каждого типа в `orderList`:
  const countsFromOrderList = orderList.reduce(
    (acc, order) => {
      if (order.is_adult) {
        acc.adults++;
      } else if (order.is_child) {
        acc.children++;
      } else {
        acc.babies++;
      }
      return acc;
    },
    { adults: 0, children: 0, babies: 0 }
  );

  // проверяем, совпадает ли количество пассажиров в обоих списках:
  const isAgeDistributionValid =
    countsFromPassengersList.adults === countsFromOrderList.adults &&
    countsFromPassengersList.children === countsFromOrderList.children &&
    countsFromPassengersList.babies === countsFromOrderList.babies;

  const handleOnNextClick = () => {
    if (!hasValidCountOfPassengers) {
      const modalOptions = {
        type: 'warning',
        title:
          'Количество пассажиров не совпадает с количеством выбранных билетов!',
        text: 'Пожалуйста, проверьте количество пассажиров! Удалите лишних или добавьте недостающих.',
      };

      dispatch(openModal(modalOptions));
    } else if (!hasFullValidData) {
      const modalOptions = {
        type: 'warning',
        title: 'Не все поля заполнены или есть ошибки!',
        text: 'Пожалуйста, проверьте что Вы указали все данные и эти данные корректны!',
      };

      dispatch(openModal(modalOptions));
    } else if (!isAgeDistributionValid) {
      const modalOptions = {
        type: 'warning',
        title:
          'Количество взрослых, детей и младенцев не совпадает с выбранными билетами!',
        text: 'Пожалуйста, перепроверьте количество каждого вида пассажира!',
      };

      dispatch(openModal(modalOptions));
    } else {
      navigate('/payment'); // если все условия выполнены, то навигируемся на след. роут
    }
  };

  return (
    <section className="passengers">
      <h2 className="visually-hidden">Пассажиры</h2>

      {passengersList.map((_, index) => (
        <ArticlePassenger key={index} index={index} />
      ))}

      {orderList.length > passengersList.length && <AddPassenger />}

      <NextPage
        text="далее"
        isActive={
          hasValidCountOfPassengers &&
          hasFullValidData &&
          isAgeDistributionValid
        }
        onNextClick={handleOnNextClick}
      />
    </section>
  );
};

export default SectionPassengers;
