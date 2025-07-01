import { useDispatch, useSelector } from "react-redux";
import { format, fromUnixTime } from "date-fns";
import getDuration from "../../../libs/getDuration";
import { AppDispatch, RootState } from "../../../redux/store";
import { setArticleBackwardCheckboxDetails } from "../../../redux/checkboxDetailsSlice";
import arrowLeft from "../../../assets/arrow-left.svg";
import backward from "../../../assets/backward.svg";
import "./articleBackwardDetails.css";

const ArticleBackwardDetails = () => {
  const dispatch: AppDispatch = useDispatch();

  const { articleBackwardCheckboxDetails } = useSelector(
    (state: RootState) => state.checkboxDetails
  );

  const { trains, currentTrainIndex } = useSelector(
    (state: RootState) => state.trains
  );

  const ticket = trains[currentTrainIndex]?.arrival;

  if (!ticket) {
    return null;
  }

  const trainNumber = ticket.train.name.split(" - ")[1];
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
    dispatch(setArticleBackwardCheckboxDetails(event.target.checked));
  };

  return (
    <article className="backward-details">
      <header className="backward-details__header">
        <div className="backward-details__wrapper">
          <img src={backward} alt="Туда" className="backward-details__icon" />
          <h3 className="backward-details__title">обратно</h3>
          <time
            className="backward-details__date"
            dateTime={format(endDateTime, "yyyy-MM-dd")}
          >
            {format(endDateTime, "dd.MM.yyyy")}
          </time>
        </div>

        <input
          id="backward-details"
          type="checkbox"
          className="backward-details__checkbox"
          onChange={handleChange}
          checked={articleBackwardCheckboxDetails}
        />
        <label
          htmlFor="backward-details"
          className="backward-details__label"
        ></label>
      </header>

      <div
        className={
          articleBackwardCheckboxDetails
            ? "backward-details__content backward-details__content_active"
            : "backward-details__content"
        }
      >
        {/* NOTE: иногда с бэка приходит строка! с undefined */}
        {trainNumber && trainNumber !== "undefined" && (
          <div className="backward-details__number-info">
            <div className="backward-details__number-info-text">№ Поезда</div>
            <div className="backward-details__number-info-number">
              {trainNumber + "C"}
            </div>
          </div>
        )}

        <div className="backward-details__name-info">
          <div className="backward-details__name-info-text">Название</div>
          <div className="backward-details__name-info-name">
            <div className="backward-details__name-info-first-name">
              {startTown}
            </div>
            <div className="backward-details__name-info-second-name">
              {endTown}
            </div>
          </div>
        </div>

        <div className="backward-details__time-info">
          <time
            className="backward-details__time-info-time-start"
            dateTime={format(endDateTime, "yyyy-MM-ddTHH:mm")}
          >
            {format(endDateTime, "HH:mm")}
          </time>

          <div className="backward-details__time-info-wrapper">
            <span className="backward-details__time-info-duration">
              {duration}
            </span>
            <img
              src={arrowLeft}
              alt="Туда"
              className="backward-details__time-info-arrow"
            />
          </div>

          <time
            className="backward-details__time-info-time-stop"
            dateTime={format(startDateTime, "yyyy-MM-ddTHH:mm")}
          >
            {format(startDateTime, "HH:mm")}
          </time>
        </div>

        <div className="backward-details__date-info">
          <time
            className="backward-details__date-info-start"
            dateTime={format(endDateTime, "yyyy-MM-dd")}
          >
            {format(endDateTime, "dd.MM.yyyy")}
          </time>

          <time
            className="backward-details__date-info-stop"
            dateTime={format(startDateTime, "yyyy-MM-dd")}
          >
            {format(startDateTime, "dd.MM.yyyy")}
          </time>
        </div>

        <div className="backward-details__town-info">
          <div className="backward-details__town-info-from">{endTown}</div>
          <div className="backward-details__town-info-to">{startTown}</div>
        </div>

        <div className="backward-details__terminal-info">
          <div className="backward-details__terminal-info-from">
            <div className="backward-details__terminal-info-name">
              {endTerminal}
            </div>
            <div className="backward-details__terminal-info-terminal">
              вокзал
            </div>
          </div>
          <div className="backward-details__terminal-info-to">
            <div className="backward-details__terminal-info-name">
              {startTerminal}
            </div>
            <div className="backward-details__terminal-info-terminal">
              вокзал
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleBackwardDetails;
