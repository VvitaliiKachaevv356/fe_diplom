import { useDispatch, useSelector } from 'react-redux';
import { format, fromUnixTime } from 'date-fns';
import getDuration from '../../libs/getDuration';
import { AppDispatch, RootState } from '../../redux/store';
import { setArticleForwardCheckboxDetails } from '../../redux/checkboxDetailsSlice';
import arrowRight from '../../assets/arrow-right.svg';
import forward from '../../assets/forward.svg';
import './articleForwardDetails.css';

const ArticleForwardDetails = () => {
  const dispatch: AppDispatch = useDispatch();

  const { articleForwardCheckboxDetails } = useSelector(
    (state: RootState) => state.checkboxDetails
  );

  const { trains, currentTrainIndex } = useSelector(
    (state: RootState) => state.trains
  );

  const ticket = trains[currentTrainIndex]?.departure; // билет 'туда'

  if (!ticket) {
    return null;
  }

  const trainNumber = ticket.train.name.split(' - ')[1]; // номер поезда
  const startTown = ticket.from.city.name;
  const endTown = ticket.to.city.name;
  const startTerminal = ticket.from.railway_station_name;
  const endTerminal = ticket.to.railway_station_name;

  const startDateTime = fromUnixTime(ticket.from.datetime)
    .toISOString()
    .slice(0, 16);

  const endDateTime = fromUnixTime(ticket.to.datetime)
    .toISOString()
    .slice(0, 16);

  const duration = getDuration(ticket.from.datetime, ticket.to.datetime);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setArticleForwardCheckboxDetails(event.target.checked));
  };

  return (
    <article className="forward-details">
      <header className="forward-details__header">
        <div className="forward-details__wrapper">
          <img src={forward} alt="Туда" className="forward-details__icon" />
          <h3 className="forward-details__title">туда</h3>
          <time
            className="forward-details__date"
            dateTime={format(startDateTime, 'yyyy-MM-dd')}
          >
            {format(startDateTime, 'dd.MM.yyyy')}
          </time>
        </div>

        <input
          id="forward-details"
          type="checkbox"
          className="forward-details__checkbox"
          onChange={handleChange}
          checked={articleForwardCheckboxDetails}
        />
        <label
          htmlFor="forward-details"
          className="forward-details__label"
        ></label>
      </header>

      <div
        className={
          articleForwardCheckboxDetails
            ? 'forward-details__content forward-details__content_active'
            : 'forward-details__content'
        }
      >
        {trainNumber && (
          <div className="forward-details__number-info">
            <div className="forward-details__number-info-text">№ Поезда</div>
            <div className="forward-details__number-info-number">
              {trainNumber + 'C'}
            </div>
          </div>
        )}

        <div className="forward-details__name-info">
          <div className="forward-details__name-info-text">Название</div>
          <div className="forward-details__name-info-name">
            <div className="forward-details__name-info-first-name">
              {startTown}
            </div>
            <div className="forward-details__name-info-second-name">
              {endTown}
            </div>
          </div>
        </div>

        <div className="forward-details__time-info">
          <time
            className="forward-details__time-info-time-start"
            dateTime={format(startDateTime, 'yyyy-MM-ddTHH:mm')}
          >
            {format(startDateTime, 'HH:mm')}
          </time>

          <div className="forward-details__time-info-wrapper">
            <span className="forward-details__time-info-duration">
              {duration}
            </span>
            <img
              src={arrowRight}
              alt="Туда"
              className="forward-details__time-info-arrow"
            />
          </div>

          <time
            className="forward-details__time-info-time-stop"
            dateTime={format(endDateTime, 'yyyy-MM-ddTHH:mm')}
          >
            {format(endDateTime, 'HH:mm')}
          </time>
        </div>

        <div className="forward-details__date-info">
          <time
            className="forward-details__date-info-start"
            dateTime={format(startDateTime, 'yyyy-MM-dd')}
          >
            {format(startDateTime, 'dd.MM.yyyy')}
          </time>

          <time
            className="forward-details__date-info-stop"
            dateTime={format(endDateTime, 'yyyy-MM-dd')}
          >
            {format(endDateTime, 'dd.MM.yyyy')}
          </time>
        </div>

        <div className="forward-details__town-info">
          <div className="forward-details__town-info-from">{startTown}</div>
          <div className="forward-details__town-info-to">{endTown}</div>
        </div>

        <div className="forward-details__terminal-info">
          <div className="forward-details__terminal-info-from">
            <div className="forward-details__terminal-info-name">
              {startTerminal}
            </div>
            <div className="forward-details__terminal-info-terminal">
              вокзал
            </div>
          </div>
          <div className="forward-details__terminal-info-to">
            <div className="forward-details__terminal-info-name">
              {endTerminal}
            </div>
            <div className="forward-details__terminal-info-terminal">
              вокзал
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleForwardDetails;
