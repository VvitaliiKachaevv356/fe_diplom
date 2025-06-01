import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store"; // Импорт только типа
import wiFi from "../../assets/wi-fi.svg";
import express from "../../assets/express.svg";
import tea from "../../assets/tea.svg";
import "./articleLastTicket.css";

interface ArticleLastTicketProps {
  index: number;
}

const ArticleLastTicket: React.FC<ArticleLastTicketProps> = ({ index }) => {
  const { lastTickets } = useSelector((state: RootState) => state.lastTickets);
  const lastTicket = lastTickets[index];

  if (!lastTicket) {
    return <div className="no-ticket">Билет не найден</div>; // Заглушка
  }

  return (
    <article className="last-ticket">
      <h3 className="visually-hidden">Билет номер {index + 1}</h3>

      <div className="last-ticket__towns">
        <div className="last-ticket__town-from">
          {lastTicket.departure?.from?.city?.name}
        </div>
        <div className="last-ticket__town-to">
          {lastTicket.departure?.to?.city?.name}
        </div>
      </div>

      <div className="last-ticket__terminals">
        <div className="last-ticket__terminal-from">
          <p className="last-ticket__terminal-name">
            {lastTicket.departure?.from?.railway_station_name}
          </p>
          <p className="last-ticket__terminal">вокзал</p>
        </div>
        <div className="last-ticket__terminal-to">
          <p className="last-ticket__terminal-name">
            {lastTicket.departure?.to?.railway_station_name}
          </p>
          <p className="last-ticket__terminal">вокзал</p>
        </div>
      </div>

      <div className="last-ticket__info">
        <div className="last-ticket__icons">
          {lastTicket.have_wifi && (
            <img
              className="last-ticket__icon last-ticket__icon_wifi"
              src={wiFi}
              alt="wi-fi"
              title="wi-fi"
            />
          )}

          {lastTicket.is_express && (
            <img
              className="last-ticket__icon last-ticket__icon_express"
              src={express}
              alt="express"
              title="экспресс"
            />
          )}

          <img
            className="last-ticket__icon last-ticket__icon_tea"
            src={tea}
            alt="tea"
            title="кипяток"
          />
        </div>

        <div className="last-ticket__price">
          <span className="last-ticket__text">от</span>
          <span className="last-ticket__cash">
            {lastTicket.min_price.toLocaleString("ru-RU")}
          </span>
          <span className="last-ticket__currency">₽</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleLastTicket;
