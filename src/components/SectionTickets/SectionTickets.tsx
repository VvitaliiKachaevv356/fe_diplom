import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ArticleTicket from '../ArticleTicket/ArticleTicket';
import Pagination from '../Pagination/Pagination';
import TicketsView from '../TicketsView/TicketsView';
import './sectionTickets.css';

const SectionTickets = () => {
  const { trains, currentCount, currentPage } = useSelector(
    (state: RootState) => state.trains
  );

  // вычисляем начальный и конечный индекс билетов для текущей страницы:
  const startIndex = (currentPage - 1) * currentCount;
  const endIndex = startIndex + currentCount;

  // берём срез только тех билетов, которые должны быть отображены на текущей странице:
  const trainsToDisplay = trains.slice(startIndex, endIndex);

  return (
    <section className="tickets">
      <h2 className="visually-hidden">Билеты</h2>

      {trains.length ? (
        <>
          <TicketsView />

          <div className="tickets__list">
            {trainsToDisplay.map((_, index) => (
              <ArticleTicket
                key={index}
                index={startIndex + index}
                text="Выбрать места"
              />
            ))}
          </div>

          <Pagination />
        </>
      ) : (
        <p className="tickets__empty">По вашему запросу ничего не найдено...</p>
      )}
    </section>
  );
};

export default SectionTickets;
