import React from 'react';
import './sectionAbout.css';

const SectionAbout = () => {
  const content = [
    {
      text: 'Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем все больше людей заказывают жд билеты через интернет.',
    },
    {
      text: 'Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать?\nМы расскажем о преимуществах заказа через интернет.',
    },
    {
      text: 'Покупать жд билеты дешево можно за 90 суток до отправления поезда.\nБлагодаря динамическому ценообразованию цена на билеты в это время самая низкая.',
      bold: true,
    },
  ];

  return (
    <section id="about" className="about">
      <h2 className="about__title">о нас</h2>
      <div className="about__content">
        {content.map((item, idx) => (
          <p
            className={`about__text${item.bold ? ' about__text_bold' : ''}`}
            key={idx}
          >
            {/* перенос текста на новую строку по каретке (если она есть): */}
            {item.text.split('\n').map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {line}
                {lineIndex !== item.text.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
};

export default SectionAbout;
