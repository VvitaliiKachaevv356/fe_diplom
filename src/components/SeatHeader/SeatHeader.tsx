import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { resetArrivalSlice } from '../../redux/arrivalSlice';
import { resetDepartureSlice } from '../../redux/departureSlice';

import backwardWhite from '../../assets/backward-white.svg';
import forwardWhite from '../../assets/forward-white.svg';
import './seatHeader.css';

const SeatHeader = ({ isForward }: { isForward: boolean }) => {
  const dispatch: AppDispatch = useDispatch();

  // по клику на кнопку 'Выбрать другой поезд' сбрасываем все данные в store для данного поезда:
  const handleClick = () => {
    dispatch(resetArrivalSlice());
    dispatch(resetDepartureSlice());
  };

  return (
    <header
      className={`seat-header${isForward ? '' : ' seat-header_backward'}`}
    >
      <img
        src={isForward ? forwardWhite : backwardWhite}
        alt={isForward ? 'туда' : 'обратно'}
        className="seat-header__icon"
      />

      <Link
        className="seat-header__return-btn"
        to="/trains"
        onClick={handleClick}
      >
        Выбрать другой поезд
      </Link>
    </header>
  );
};

export default SeatHeader;
