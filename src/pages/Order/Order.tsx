import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import HeaderOrder from '../../components/sections/HeaderOrder/HeaderOrder';
import SectionOrder from '../../components/sections/SectionOrder/SectionOrder';

import './order.css';

const Order = () => {
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
      <HeaderOrder />

      <main className="order-page">
        <div className="order-page__container">
          <SectionOrder />
        </div>
      </main>
    </>
  );
};

export default Order;
