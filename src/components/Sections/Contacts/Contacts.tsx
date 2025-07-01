import React from 'react';
import './contacts.css';

const Contacts = () => {
  const items = [
    {
      title: 'call',
      href: 'tel:8 (800) 000 00 00',
      content: '8 (800) 000 00 00',
    },
    {
      title: 'email',
      href: 'mailto:inbox@mail.ru',
      content: 'inbox@mail.ru',
    },
    {
      title: 'skype',
      href: 'skype:tu.train.tickets',
      content: 'tu.train.tickets',
    },
    {
      title: 'maps',
      href: 'https://yandex.ru/maps/?text=Москва, Московская 27-35 555 555',
      content: 'г. Москва\nул. Московская 27-35\n555 555',
      target: '_blank',
    },
  ];

  return (
    <ul className="contacts">
      {items.map((item, itemIndex) => (
        <li className="contacts__item" key={itemIndex}>
          <a
            href={item.href}
            className={`contacts__link contacts__link_${item.title}`}
            title={item.title}
            target={item.target || '_self'}
          ></a>

          <span className="contacts__info">
            {/* перенос текста на новую строку по каретке (если она есть): */}
            {item.content.split('\n').map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {line}
                {lineIndex !== item.content.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Contacts;
