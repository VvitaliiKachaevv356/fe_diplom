import { useState, useEffect, useRef, useCallback } from 'react';
import feedbackList from '../../data/feedback.json';
import './sectionFeedback.css';

interface IFeedback {
  src: string;
  user: string;
  text: string;
}

const SectionFeedback = () => {
  const [activeDot, setActiveDot] = useState<number>(0);
  const [visibleFeedbacks, setVisibleFeedbacks] = useState<IFeedback[]>([
    feedbackList[0],
    feedbackList[1],
  ]);

  const feedbackListRef = useRef<HTMLUListElement | null>(null); // ссылка на <ul> с отзывами

  // функция для обновления видимых отзывов:
  const updateFeedbacks = (index: number) => {
    setActiveDot(index);
    setVisibleFeedbacks([feedbackList[index * 2], feedbackList[index * 2 + 1]]);
  };

  // функция для проверки видимости хотя бы 50% контейнера <ul>:
  const isVisible = (element: HTMLElement | null) => {
    if (element) {
      const rect = element.getBoundingClientRect();
      const elementHeight = rect.bottom - rect.top;
      const visibleHeight =
        Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top);
      return visibleHeight >= elementHeight * 0.5;
    }
    return false;
  };

  // функция переключения отзывов, если контейнер с ними виден (useCallback для мемоизации функции):
  const checkAndSwitchFeedbacks = useCallback(() => {
    if (feedbackListRef.current && isVisible(feedbackListRef.current)) {
      const nextIndex = (activeDot + 1) % 5;
      updateFeedbacks(nextIndex);
    }
  }, [activeDot]); // зависимость мемоизированной функции от activeDot

  // переключаем отзывы каждые 5 секунд, если контейнер с отзывами виден:
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkAndSwitchFeedbacks();
    }, 1000 * 5);

    return () => clearInterval(intervalId); // очистка интервала при размонтировании компонента
  }, [checkAndSwitchFeedbacks]);

  return (
    <section id="feedback" className="feedback">
      <h2 className="feedback__title">отзывы</h2>
      <ul className="feedback__list" ref={feedbackListRef}>
        {visibleFeedbacks.map(({ src, user, text }, idx) => {
          // динамический импорт изображений из json, с помощью Vite:
          const url = new URL(`../../assets/${src}`, import.meta.url).href;

          return (
            <li className="feedback__item" key={idx}>
              <img src={url} alt="аватар" className="feedback__avatar" />
              <div className="feedback__content">
                <h3 className="feedback__user">{user}</h3>
                <q className="feedback__text">{text}</q>
              </div>
            </li>
          );
        })}
      </ul>

      <ul className="feedback__dots">
        {[...Array(5)].map((_, idx) => (
          <li
            key={idx}
            className={`feedback__dot${
              idx === activeDot ? ' feedback__dot_active' : ''
            }`}
            onClick={() => updateFeedbacks(idx)}
          ></li>
        ))}
      </ul>
    </section>
  );
};

export default SectionFeedback;
