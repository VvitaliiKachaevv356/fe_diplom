import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import Header from '../../components/Sections/Header/Header';
import LineCurrent from '../../components/UI/LineCurrent/LineCurrent';
import Loader from '../../components/UI/Loader/Loader';
import SectionLastTickets from '../../components/Section/SectionLastTickets/SectionLastTickets';
import SectionSeats from '../../components/Section/SectionSeats/SectionSeats';
import SectionSettings from '../../components/Section/SectionSettings/SectionSettings';

const Seats = () => {
  const location = useLocation();

  const { forwardCarriagesLoading, backwardCarriagesLoading } = useSelector(
    (state: RootState) => state.carriages
  );

  useEffect(() => {
    // переход по якорной ссылке:
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1)); // убираем "#" из хеша
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // плавная прокрутка
      }
    } else {
      window.scrollTo(0, 0); // прокручиваем страницу вначало при смене роута
    }
  }, [location]); // Срабатывает при изменении маршрута

  return (
    <>
      <Header />
      {forwardCarriagesLoading || backwardCarriagesLoading ? (
        <Loader />
      ) : (
        <>
          <LineCurrent num={1} />
          <div className="page">
            <aside className="sidebar">
              <SectionSettings />
              <SectionLastTickets />
            </aside>
            <main className="main">
              <SectionSeats />
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default Seats;
