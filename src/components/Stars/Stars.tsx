import { useState } from 'react';
import './stars.css';

const Stars = () => {
  const [rating, setRating] = useState(0); // рейтинг по умолчанию (0 - ни одна звезда не выбрана)

  return (
    <ul className="stars">
      {Array.from({ length: 5 }, (_, index) => (
        <li
          key={index}
          className={`stars__item${
            index < rating ? ' stars__item_active' : ''
          }`}
          onClick={() => setRating(index + 1)}
        ></li>
      ))}
    </ul>
  );
};

export default Stars;
