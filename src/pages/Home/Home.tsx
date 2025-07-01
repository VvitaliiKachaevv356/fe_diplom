import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import HeaderHome from '../../components/Sections/HeaderHome/HeaderHome';
import Line from '../../components/UI/Line/Line';
import SectionAbout from '../../components/Section/SectionAbout/SectionAbout';
import SectionDescription from '../../components/Section/SectionDescription/SectionDescription';
import SectionFeedback from '../../components/Section/SectionFeedback/SectionFeedback';

const Home = () => {
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
      <HeaderHome />
      <Line />
      <main>
        <SectionAbout />
        <SectionDescription />
        <SectionFeedback />
      </main>
    </>
  );
};

export default Home;
