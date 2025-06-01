import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { setIsOpen } from '../../redux/passengersSlice';
import NextPassenger from '../NextPassenger/NextPassenger';
import success from '../../assets/success.svg';
import './passengersCheckSuccess.css';

const PassengersCheckSuccess = ({ index }: { index: number }) => {
  const dispatch: AppDispatch = useDispatch();

  // получаем заготовку массива с пассажирами:
  const { passengersList } = useSelector(
    (state: RootState) => state.passengers
  );

  const handleNextPassengerClick = () => {
    // если есть след. карточка, то раскрываем её и прокручиваем страницу к ней:
    if (passengersList.length > index + 1) {
      dispatch(setIsOpen({ index: index + 1, isOpen: true }));
      // NOTE: наверно можно было бы прокидывать рефки, но получится много лишнего кода, лишние пропсы, которые, например, в компоненте NextPage на каждом роуте вообще не нужны, имхо...
      const nextPassenger = document.getElementById(`passenger-${index + 1}`);
      nextPassenger?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // если это была последняя карточка, то прокручиваем страницу до кнопки 'NextPage':
      const nextPageButton = document.querySelector('.next-page');
      nextPageButton?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  return (
    <div className="passengers-check_success">
      <div className="passengers-check__wrapper_success">
        <img
          className="passengers-check__icon_success"
          src={success}
          alt="success"
        />
        <span className="passengers-check__text_success">Готово</span>
      </div>

      <NextPassenger onClickHandler={handleNextPassengerClick} />
    </div>
  );
};

export default PassengersCheckSuccess;
