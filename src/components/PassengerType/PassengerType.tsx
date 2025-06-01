import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setType } from '../../redux/passengersSlice';
import './passengerType.css';

interface IPassengerTypeProps {
  index: number;
  type: string;
}

const types = ['Взрослый', 'Детский', 'Без места']; // возможные типы пассажиров

const PassengerType = ({ index, type }: IPassengerTypeProps) => {
  const [isOpenList, setIsOpenList] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const choosePassengerType = (el: string) => {
    setIsOpenList(false);

    // правим store только если данные поменялись:
    if (el !== type) {
      dispatch(setType({ index, type: el }));
    }
  };

  return (
    <div className="passenger-type">
      <div className="passenger-type__wrapper">
        <p className="passenger-type__text">{type}</p>
        <div
          className="passenger-type__arrow"
          onClick={() => setIsOpenList(true)}
        ></div>

        {isOpenList && (
          <ul className="passenger-type__list">
            {types.map((el, idx) => (
              <li
                key={idx}
                className="passenger-type__item"
                onClick={() => choosePassengerType(el)}
              >
                {el}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PassengerType;
