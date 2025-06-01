import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
  setArrivalCurrentCarriageType,
  setArrivalCurrentTypeCarriagesList,
  setArrivalActiveCarriageIndex,
  setArrivalCopyCurrentTypeCarriagesList,
} from '../../redux/arrivalSlice';
import {
  setDepartureCurrentCarriageType,
  setDepartureCurrentTypeCarriagesList,
  setDepartureActiveCarriageIndex,
  setDepartureCopyCurrentTypeCarriagesList,
} from '../../redux/departureSlice';
import './carriageType.css';

const CarriageType = ({ isForward }: { isForward: boolean }) => {
  const dispatch: AppDispatch = useDispatch();

  const { adults, baby, children, currentCarriageType, orderList } =
    useSelector((state: RootState) =>
      isForward ? state.departure : state.arrival
    );

  const { forwardCarriages, backwardCarriages } = useSelector(
    (state: RootState) => state.carriages
  );

  const carriageTypes = [
    { name: 'seat', text: 'Сидячий', type: 'fourth' },
    { name: 'platzkart', text: 'Плацкарт', type: 'third' },
    { name: 'compartment', text: 'Купе', type: 'second' },
    { name: 'lux', text: 'Люкс', type: 'first' },
  ];

  // клик по НЕ активной вкладке:
  const handleChangeActiveItem = (index: number) => {
    const carriageType = carriageTypes[index].type;

    // фильтруем список вагонов по типу вагона:
    const matchedCarriagesList = (
      isForward ? forwardCarriages : backwardCarriages
    ).filter((carriage) => carriage.coach.class_type === carriageType);

    // создаем обновленный список без учёта заблокированных мест:
    const newCopyList = matchedCarriagesList.map((carriage) => ({
      ...carriage,
      seats: carriage.seats.map((seat, idx) => {
        const isAdultSelected = orderList.some(
          (order) =>
            order.coach_id === carriage.coach._id &&
            order.seat_number === idx + 1 &&
            order.is_adult
        );

        const isChildrenSelected = orderList.some(
          (order) =>
            order.coach_id === carriage.coach._id &&
            order.seat_number === idx + 1 &&
            order.is_child
        );

        const isBabySelected = orderList.some(
          (order) =>
            order.coach_id === carriage.coach._id &&
            order.seat_number === idx + 1 &&
            order.is_baby
        );

        let available = seat.available;
        let isActive = seat.isActive;

        if (adults.isActive) {
          // взрослые: доступны все места, кроме занятых детьми:
          available = seat.available && !isChildrenSelected;
          isActive = isAdultSelected;
        } else if (children.isActive) {
          // дети: доступны все места, кроме занятых взрослыми:
          available = seat.available && !isAdultSelected && !isChildrenSelected;
          isActive = isChildrenSelected;
        } else if (baby.isActive) {
          // младенцы: только на месте взрослых:
          available = isAdultSelected && !isBabySelected;
          isActive = isBabySelected;
        }

        return { ...seat, available, isActive };
      }),
    }));

    // проверяем, выбраны ли уже 4 места:
    const isMaxSeatsSelected = orderList.length === 4;

    // создаем обновленный список с учётом заблокированных мест:
    const newList = newCopyList.map((carriage) => ({
      ...carriage,
      seats: carriage.seats.map((seat) => {
        return {
          ...seat,
          available: isMaxSeatsSelected ? false : seat.available,
        };
      }),
    }));

    // билет туда:
    if (isForward) {
      dispatch(setDepartureCurrentCarriageType(carriageType)); // сохраняем в store класс вагона
      dispatch(setDepartureCopyCurrentTypeCarriagesList(newCopyList)); // без блокировки мест
      dispatch(setDepartureCurrentTypeCarriagesList(newList)); // c блокировкой мест
      dispatch(setDepartureActiveCarriageIndex(0));
      return;
    }

    // билет обратно:
    dispatch(setArrivalCurrentCarriageType(carriageType)); // сохраняем в store класс вагона
    dispatch(setArrivalCopyCurrentTypeCarriagesList(newCopyList)); // без блокировки мест
    dispatch(setArrivalCurrentTypeCarriagesList(newList)); // c блокировкой мест
    dispatch(setArrivalActiveCarriageIndex(0)); // делаем активным первый элемент списка
  };

  return (
    <div className="carriage-type">
      <h4 className="carriage-type__title">Тип вагона</h4>

      <ul className="carriage-type__list">
        {carriageTypes.map((carriage, index) => (
          <li
            key={index}
            className={`carriage-type__item${
              currentCarriageType === carriage.type
                ? ' carriage-type__item_active'
                : ''
            }`}
            onClick={
              currentCarriageType === carriage.type
                ? undefined
                : () => handleChangeActiveItem(index)
            }
          >
            <span
              className={`carriage-type__icon carriage-type__icon_${carriage.name}`}
            ></span>
            <span>{carriage.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarriageType;
