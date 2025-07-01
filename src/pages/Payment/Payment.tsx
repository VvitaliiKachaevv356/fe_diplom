import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../components/Sections/Header/Header';
import LineCurrent from '../../components/UI/LineCurrent/LineCurrent';
import SectionDetails from '../../components/Section/SectionDetails/SectionDetails';
import SectionPayment from '../../components/Shared/SectionPayment/SectionPayment';

const Payment = () => {
  const location = useLocation();

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
      <LineCurrent num={3} />
      <div className="page">
        <aside className="sidebar">
          <SectionDetails />
        </aside>
        <main className="main">
          <SectionPayment />
        </main>
      </div>
    </>
  );
};

export default Payment;
