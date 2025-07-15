import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { addPassengerToList } from '../../../../redux/passengersSlice';
import add from '../../../../assets/add.svg';
import './addPassenger.css';

const AddPassenger = () => {
  const dispatch: AppDispatch = useDispatch();

  // обработчик добавления данных пассажира в массив 'passengersList' в store:
  const handleAddPassengersData = () => {
    dispatch(addPassengerToList());
  };

  return (
    <div className="add-passenger">
      <div className="add-passenger__text">Добавить пассажира</div>
      <img
        className="add-passenger__icon"
        src={add}
        alt="добавить"
        onClick={handleAddPassengersData}
      />
    </div>
  );
};

export default AddPassenger;
