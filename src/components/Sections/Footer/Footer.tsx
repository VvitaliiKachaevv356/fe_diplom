import { useEffect, useRef } from 'react';
import Contacts from '../../Sections/Contacts/Contacts';
import Copyrights from '../Copyrights/Copyrights';
import Logo from '../Logo/Logo';
import Socials from '../../Socials/Socials';
import SubscribeForm from '../../SubscribeForm/SubscribeForm';
import './footer.css';

const Footer = () => {
  const refElement = useRef<HTMLDivElement | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="footer">
      <div className="footer__top-container">
        <div className="footer__contacts">
          <h4 className="footer__title">Свяжитесь с нами</h4>
          <Contacts />
        </div>

        <div className="footer__subscribe">
          <div className="footer__subscribe-form-container">
            <h4 className="footer__title">Подписка</h4>
            <p className="footer__text">Будьте в курсе событий</p>
            <SubscribeForm />
          </div>
          <div className="footer__socials">
            <h4 className="footer__title">Подписывайтесь на нас</h4>
            <Socials />
          </div>
        </div>
      </div>

      <div className="footer__bottom-container" ref={refElement}>
        <Logo />
        <span
          className="footer__up"
          title="Вернуться в начало"
          onClick={scrollToTop}
        ></span>
        <Copyrights />
      </div>
    </footer>
  );
};

export default Footer;
