import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { openModal } from '../../redux/modalSlice';
import NextPassenger from '../NextPassenger/NextPassenger';
import './passengersNotChecked.css';

const PassengersNotChecked = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleNextPassengerClick = () => {
    const modalOptions = {
      type: 'warning',
      title: 'Не все поля заполнены!',
      text: 'Пожалуйста, проверьте что Вы внесли все данные для этого пассажира!',
    };

    dispatch(openModal(modalOptions));
  };

  return (
    <div className="passengers-not-checked">
      <NextPassenger onClickHandler={handleNextPassengerClick} />
    </div>
  );
};

export default PassengersNotChecked;
