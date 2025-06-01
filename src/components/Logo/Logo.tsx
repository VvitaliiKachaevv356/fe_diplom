import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import logo from '../../assets/logo.svg';
import './logo.css';
import { resetArrivalSlice } from '../../redux/arrivalSlice';
import { resetCarriagesSlice } from '../../redux/carriagesSlice';
import { resetCheckboxDetailsSlice } from '../../redux/checkboxDetailsSlice';
import { resetCheckboxSlice } from '../../redux/checkboxSlice';
import { resetDepartureSlice } from '../../redux/departureSlice';
import { resetLastTicketsSlice } from '../../redux/lastTicketsSlice';
import { resetOrderSlice } from '../../redux/orderSlice';
import { resetParamsSlice } from '../../redux/paramsSlice';
import { resetPassengersSlice } from '../../redux/passengersSlice';
import { resetPaymentSlice } from '../../redux/paymentSlice';
import { resetSearchFormSlice } from '../../redux/searchFormSlice';
import { resetTownsSlice } from '../../redux/townsSlice';
import { resetTrainsSlice } from '../../redux/trainsSlice';

const Logo = () => {
  const dispatch: AppDispatch = useDispatch();

  // полная очистка redux-store:
  const handleResetStore = () => {
    dispatch(resetOrderSlice()); // 1. полная очистка redux-store по ключу 'order'
    dispatch(resetPaymentSlice()); // 2. полная очистка redux-store по ключу 'payment'
    dispatch(resetPassengersSlice()); // 3. полная очистка redux-store по ключу 'passengers'
    dispatch(resetArrivalSlice()); // 4. полная очистка redux-store по ключу 'arrival'
    dispatch(resetDepartureSlice()); // 5. полная очистка redux-store по ключу 'departure'
    dispatch(resetCarriagesSlice()); // 6. полная очистка redux-store по ключу 'carriages'
    dispatch(resetTrainsSlice()); // 7. полная очистка redux-store по ключу 'trains'
    dispatch(resetLastTicketsSlice()); // 8. полная очистка redux-store по ключу 'lastTickets'
    dispatch(resetTownsSlice()); // 9. полная очистка redux-store по ключу 'towns'
    dispatch(resetParamsSlice()); // 10. полная очистка redux-store по ключу 'params'
    dispatch(resetSearchFormSlice()); // 11. полная очистка redux-store по ключу 'searchForm'
    dispatch(resetCheckboxDetailsSlice()); // 12. полная очистка redux-store по 'checkboxDetails'
    dispatch(resetCheckboxSlice()); // 13. полная очистка redux-store по ключу 'checkbox'
  };

  return (
    <Link to="/" className="logo" onClick={() => handleResetStore()}>
      <img src={logo} alt="Логотип" />
    </Link>
  );
};

export default Logo;
