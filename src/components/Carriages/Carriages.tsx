import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { setArrivalActiveCarriageIndex } from '../../redux/arrivalSlice';
import { setDepartureActiveCarriageIndex } from '../../redux/departureSlice';
import Carriage from '../Carriage/Carriage';
import './carriages.css';

const Carriages = ({ isForward }: { isForward: boolean }) => {
  const dispatch: AppDispatch = useDispatch();

  const { activeCarriageIndex, currentTypeCarriagesList } = useSelector(
    (state: RootState) => (isForward ? state.departure : state.arrival)
  );

  // по клику на номер вагона меняем класс активности у него:
  const handleChangeActiveCarriageIndex = (index: number) => {
    dispatch(
      isForward
        ? setDepartureActiveCarriageIndex(index)
        : setArrivalActiveCarriageIndex(index)
    );
  };

  // элементы <li> - номера вагонов выбранного класса в выбранном поезде:
  const carriagesNumbers = currentTypeCarriagesList.map((carriage, index) => (
    <li
      key={carriage.coach._id}
      className={`carriages__available-carriages-number${
        activeCarriageIndex === index
          ? ' carriages__available-carriages-number_active'
          : ''
      }`}
      onClick={
        activeCarriageIndex === index
          ? undefined
          : () => handleChangeActiveCarriageIndex(index)
      }
    >
      {carriage.coach.carriage_number.toString().padStart(2, '0')}
    </li>
  ));

  return (
    <div className="carriages">
      {currentTypeCarriagesList.length ? (
        <>
          <header className="carriages__header">
            <div className="carriages__available-carriages">
              <span className="carriages__available-carriages-text">
                Вагоны
              </span>
              <ul className="carriages__available-carriages-numbers">
                {carriagesNumbers}
              </ul>
            </div>
            <div className="carriages__description">
              Нумерация вагонов начинается с головы поезда
            </div>
          </header>

          <Carriage isForward={isForward} />

          {/* функциональность на случай отображения нескольких вагонов сразу:  */}
          {/* <Carriage isForward={isForward} /> */}
        </>
      ) : (
        <p className="carriages__not-found">
          В этом поезде не осталось свободных мест в вагонах выбранного
          класса...
        </p>
      )}
    </div>
  );
};

export default Carriages;
