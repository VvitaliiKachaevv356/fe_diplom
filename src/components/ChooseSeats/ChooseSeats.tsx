import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import getRandomNumber from '../../libs/getRandomNumber';
import { AppDispatch, RootState } from '../../redux/store';
import { setArrivalRouteDestinationId } from '../../redux/arrivalSlice';
import {
  fetchForwardCarriages,
  fetchBackwardCarriages,
} from '../../redux/carriagesSlice';
import { setDepartureRouteDestinationId } from '../../redux/departureSlice';
import {
  setCurrentTrainIndex,
  setCurrentPotentialPassengersCount,
} from '../../redux/trainsSlice';
import './chooseSeats.css';

const ChooseSeats = ({ index }: { index: number }) => {
  const dispatch: AppDispatch = useDispatch();

  const { trains } = useSelector((state: RootState) => state.trains);

  // по клику на кнопку 'Выбрать места':
  const handleClick = () => {
    const forwardDestinationId = trains[index].departure._id; // id направления (туда)
    const backwardDestinationId = trains[index].arrival?._id || ''; // id направления (обратно)

    dispatch(setCurrentPotentialPassengersCount(getRandomNumber(0, 20))); // кол-во потенц. покупат.

    dispatch(setCurrentTrainIndex(index)); // 1. сохраняем индекс выбранного билета в store
    dispatch(setDepartureRouteDestinationId(forwardDestinationId)); // 2. сохраняем id в store
    dispatch(fetchForwardCarriages(forwardDestinationId)); // 3. запрос на вагоны (туда)

    if (backwardDestinationId) {
      dispatch(setArrivalRouteDestinationId(backwardDestinationId)); // 4. сохраняем id в store
      dispatch(fetchBackwardCarriages(backwardDestinationId)); // 5. запрос на вагоны (обратно)
    }
  };

  return (
    <div className="choose-seats">
      <Link className="choose-seats__link" to="/seats" onClick={handleClick}>
        Выбрать места
      </Link>
    </div>
  );
};

export default ChooseSeats;
