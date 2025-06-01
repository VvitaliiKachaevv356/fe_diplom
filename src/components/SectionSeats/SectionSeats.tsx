import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { openModal } from '../../redux/modalSlice';
import { setPassengersList } from '../../redux/passengersSlice';
import ArticleSeat from '../ArticleSeat/ArticleSeat';
import NextPage from '../NextPage/NextPage';
import './sectionSeats.css';

const SectionSeats = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { trains, currentTrainIndex } = useSelector(
    (state: RootState) => state.trains
  );

  const {
    adults: departureAdults,
    children: departureChildren,
    baby: departureBaby,
    orderList: departureOrderList,
  } = useSelector((state: RootState) => state.departure);

  const {
    route_direction_id: arrivalRouteDirectionId,
    adults: arrivalAdults,
    children: arrivalChildren,
    baby: arrivalBaby,
    orderList: arrivalOrderList,
  } = useSelector((state: RootState) => state.arrival);

  const { passengersList } = useSelector(
    (state: RootState) => state.passengers
  );

  const ticket = trains[currentTrainIndex];

  // NOTE: заглушка для сброса redux-store при переходе на главный роут по пунктам меню:
  if (!ticket) {
    return (
      <section className="seats">
        <h2 className="seats__title">
          Информация о поезде временно недоступна
        </h2>
      </section>
    );
  }

  const hasArrivalProperty: boolean = ticket.arrival !== undefined;

  // условие №1: заказан хотя бы 1 билет в любую сторону:
  const conditionHasOrder =
    departureOrderList.length > 0 ||
    (!!arrivalRouteDirectionId && arrivalOrderList.length > 0);

  // условие №2: количество билетов туда и обратно совпадает:
  const conditionOrderCount =
    !arrivalRouteDirectionId ||
    departureOrderList.length === arrivalOrderList.length;

  // условие №3: количество каждого типа пассажира туда и обратно совпадает:
  const conditionPassengersCount =
    !arrivalRouteDirectionId ||
    (departureAdults.count === arrivalAdults.count &&
      departureChildren.count === arrivalChildren.count &&
      departureBaby.count === arrivalBaby.count);

  // если все условия выполнены, то перекрашиваем кнопку:
  const isNextAllowed =
    conditionHasOrder && conditionOrderCount && conditionPassengersCount;

  const handleOnNextClick = async () => {
    if (!conditionHasOrder) {
      const modalOptions = {
        type: 'warning',
        title: 'Нужно заказать хотя бы 1 билет!',
        text: 'Пожалуйста, проверьте что Вы заказали хотя бы 1 билет!',
      };

      dispatch(openModal(modalOptions));
      return;
    }

    if (!conditionOrderCount) {
      const modalOptions = {
        type: 'warning',
        title: 'Количество билетов туда и обратно должно совпадать!',
        text: 'Пожалуйста, проверьте чтобы количество выбранных билетов туда и обратно было одинаковым!',
      };

      dispatch(openModal(modalOptions));
      return;
    }

    if (!conditionPassengersCount) {
      const modalOptions = {
        type: 'warning',
        title: 'Количество пассажиров должно совпадать!',
        text: 'Пожалуйста, проверьте чтобы туда и обратно ехало одинаковое количество взрослых, детей и младенцев!',
      };

      dispatch(openModal(modalOptions));
      return;
    }

    // если все условия выполнены и не были прежде введены данные по пассажирам:
    if (!passengersList.length) {
      dispatch(setPassengersList(departureOrderList.length)); // задаем начальный список пассажиров
    }

    await navigate('/passengers'); // навигируемся на нужный роут только ПОСЛЕ формирования списка
  };

  return (
    <section className="seats">
      <h2 className="seats__title">Выбор мест</h2>
      <ArticleSeat isForward />
      {hasArrivalProperty && <ArticleSeat isForward={false} />}
      <NextPage
        text="далее"
        isActive={isNextAllowed}
        onNextClick={handleOnNextClick}
      />
    </section>
  );
};

export default SectionSeats;
