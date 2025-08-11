import './socials.css';

const Socials = () => {
  const items = [
    { id: 1, title: 'youtube', href: 'https://www.youtube.com' },
    { id: 2, title: 'linkedin', href: 'https://www.linkedin.com' },
    { id: 3, title: 'google', href: 'https://accounts.google.com' },
    { id: 4, title: 'facebook', href: 'http://facebook.com' },
    { id: 5, title: 'twitter', href: 'https://twitter.com' },
  ];

  return (
    <ul className="socials">
      {items.map((item) => (
        <li className="socials__item" key={item.id}>
          <a
            className={`socials__link socials__link_${item.title}`}
            href={item.href}
            target="_blank"
            title={item.title}
          ></a>
        </li>
      ))}
    </ul>
  );
};

export default Socials;
