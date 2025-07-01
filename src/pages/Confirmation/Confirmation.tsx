import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../redux/store';

import Header from '../../components/Sections/Header/Header';
import LineCurrent from '../../components/UI/LineCurrent/LineCurrent';
import Loader from '../../components/UI/Loader/Loader';
import SectionConfirmation from '../../components/Section/SectionConfirmation/SectionConfirmation';
import SectionDetails from '../../components/Section/SectionDetails/SectionDetails';

const Confirmation = () => {
  const location = useLocation();

  const { orderIsLoading } = useSelector((state: RootState) => state.order);

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
      {orderIsLoading ? (
        <Loader />
      ) : (
        <>
          <LineCurrent num={4} />
          <div className="page">
            <aside className="sidebar">
              <SectionDetails />
            </aside>
            <main className="main">
              <SectionConfirmation />
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default Confirmation;
