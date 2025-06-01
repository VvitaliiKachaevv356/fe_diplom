import { Link } from 'react-router-dom';
import computer from '../../assets/computer.svg';
import earth from '../../assets/earth.svg';
import office from '../../assets/office.svg';
import './sectionDescription.css';

const SectionDescription = () => {
  const items = [
    { alt: 'Удобно', src: computer, text: 'Удобный заказ на сайте' },
    { alt: 'Удаленно', src: office, text: 'Нет необходимости ехать в офис' },
    { alt: 'Выбор', src: earth, text: 'Огромный выбор направлений' },
  ];

  return (
    <section id="description" className="description">
      <header className="description__header">
        <h2 className="description__title">Как это работает</h2>
        <Link to="#footer" className="desription__link">
          Узнать больше
        </Link>
      </header>

      <ul className="description__list">
        {items.map((item, idx) => (
          <li className="description__item" key={idx}>
            <img src={item.src} alt={item.alt} className="description__img" />
            <p className="description__text">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SectionDescription;
