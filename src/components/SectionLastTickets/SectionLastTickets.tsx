import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ArticleLastTicket from '../ArticleLastTicket/ArticleLastTicket';
import './sectionLastTickets.css';

const SectionLastTickets = () => {
  const { lastTickets, lastTicketsLoading } = useSelector(
    (state: RootState) => state.lastTickets
  );

  return (
    <section className="last-tickets">
      {lastTicketsLoading ? (
        <p className="last-tickets__loading">ищем последние билеты...</p>
      ) : (
        <>
          <h3 className="last-tickets__title">последние билеты</h3>

          {lastTickets.length ? (
            lastTickets.map((_, index) => (
              <ArticleLastTicket key={index} index={index} />
            ))
          ) : (
            <p className="last-tickets__not-found">
              сожалеем, но ничего не найдено...
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default SectionLastTickets;
