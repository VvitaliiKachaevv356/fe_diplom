import { useDispatch, useSelector } from 'react-redux';
import { fromUnixTime } from 'date-fns';
import getClassInfo from '../../libs/getClassInfo';
import getDuration from '../../libs/getDuration';

import { AppDispatch, RootState } from '../../redux/store';
import { resetArrivalSlice } from '../../redux/arrivalSlice';
import { resetDepartureSlice } from '../../redux/departureSlice';

import ChangeData from '../ChangeData/ChangeData';
import ChooseSeats from '../ChooseSeats/ChooseSeats';
import TooltipPrice from '../TooltipPrice/TooltipPrice';

import arrowLeft from '../../assets/arrow-left.svg';
import arrowRight from '../../assets/arrow-right.svg';
import express from '../../assets/express.svg';
import tea from '../../assets/tea.svg';
import train from '../../assets/train.svg';
import wiFi from '../../assets/wi-fi.svg';

import './articleTicket.css';

const ArticleTicket = ({ text, index }: { text: string; index: number }) => {
  const dispatch: AppDispatch = useDispatch();

  const { trains } = useSelector((state: RootState) => state.trains); // массив найденных поездов
  const ticket = trains[index]; // конкретный билет

  // NOTE: заглушка для сброса redux-store при переходе на главный роут по пунктам меню:
  if (!ticket) {
    return <article className="ticket">Данных не получено...</article>;
  }

  const [trainName, trainNumber] = ticket.departure.train.name.split(' - '); // номер и имя поезда

  const fourthClass = getClassInfo(
    ticket.departure.available_seats_info.fourth,
    ticket.arrival?.available_seats_info.fourth,
    ticket.departure.price_info.fourth || {},
    ticket.arrival?.price_info.fourth || {}
  );

  const thirdClass = getClassInfo(
    ticket.departure.available_seats_info.third,
    ticket.arrival?.available_seats_info.third,
    ticket.departure.price_info.third || {},
    ticket.arrival?.price_info.third || {}
  );

  const secondClass = getClassInfo(
    ticket.departure.available_seats_info.second,
    ticket.arrival?.available_seats_info.second,
    ticket.departure.price_info.second || {},
    ticket.arrival?.price_info.second || {}
  );

  const firstClass = getClassInfo(
    ticket.departure.available_seats_info.first,
    ticket.arrival?.available_seats_info.first,
    ticket.departure.price_info.first || {},
    ticket.arrival?.price_info.first || {}
  );

  const seatData = [
    {
      condition:
        ticket.departure.have_fourth_class || ticket.arrival?.have_fourth_class,
      seatType: 'Сидячий',
      seatData: fourthClass,
    },
    {
      condition:
        ticket.departure.have_third_class || ticket.arrival?.have_third_class,
      seatType: 'Плацкарт',
      seatData: thirdClass,
    },
    {
      condition:
        ticket.departure.have_second_class || ticket.arrival?.have_second_class,
      seatType: 'Купе',
      seatData: secondClass,
    },
    {
      condition:
        ticket.departure.have_first_class || ticket.arrival?.have_first_class,
      seatType: 'Люкс',
      seatData: firstClass,
    },
  ];

  const featureData = [
    {
      condition: ticket.departure.have_wifi || ticket.arrival?.have_wifi,
      icon: wiFi,
      alt: 'wi-fi',
    },
    {
      condition: ticket.departure.is_express || ticket.arrival?.is_express,
      icon: express,
      alt: 'express',
    },
    { condition: true, icon: tea, alt: 'tea' },
  ];

  // смена поезда:
  const handleChangeTrain = () => {
    // 1. сбрасываем данные по прежде выбранным местам в слайсах departure и arrival:
    dispatch(resetArrivalSlice());
    dispatch(resetDepartureSlice());
  };

  return (
    <article className="ticket">
      <h3 className="visually-hidden">Билет</h3>

      <div className="ticket__wrapper-left">
        <img className="ticket__train-img" src={train} alt="поезд" />
        <div className="ticket__train-number">{trainNumber}C</div>

        <div className="ticket__train-short-info">
          {/* NOTE: откуда получать эти данные - ??? */}
          {/*
            <div className="ticket__train-town-departure">
              <span>Адлер</span>
              <span>→</span>
            </div>
          */}
          <div className="ticket__train-town-from">
            <span>{ticket.departure.from.city.name}</span>
            <span>→</span>
          </div>
          <div className="ticket__train-town-to">
            {ticket.departure.to.city.name}
          </div>
          {trainName !== 'undefined' && (
            <div className="ticket__train-name">«{trainName}»</div>
          )}
        </div>
      </div>

      <div className="ticket__wrapper-middle">
        {/* билет туда (есть всегда!!!): */}
        <div className="ticket__forward">
          <div className="ticket__forward-info">
            <div className="ticket__time">
              {fromUnixTime(ticket.departure.from.datetime)
                .toISOString()
                .slice(11, 16)}
            </div>
            <div className="ticket__town">
              {ticket.departure.from.city.name}
            </div>
            <div className="ticket__terminal">
              {ticket.departure.from.railway_station_name} вокзал
            </div>
          </div>
          <div className="ticket__duration-info">
            <div className="ticket__duration-time">
              {getDuration(
                ticket.departure.from.datetime,
                ticket.departure.to.datetime
              )}
            </div>
            <img
              className="ticket__duration-icon"
              src={arrowRight}
              alt="Туда"
            />
          </div>
          <div className="ticket__backward-info">
            <div className="ticket__time">
              {fromUnixTime(ticket.departure.to.datetime)
                .toISOString()
                .slice(11, 16)}
            </div>
            <div className="ticket__town">{ticket.departure.to.city.name}</div>
            <div className="ticket__terminal">
              {ticket.departure.to.railway_station_name} вокзал
            </div>
          </div>
        </div>

        {/* билет обратно (может не быть!!!): */}
        {ticket.arrival && (
          <div className="ticket__backward">
            <div className="ticket__forward-info">
              <div className="ticket__time">
                {fromUnixTime(ticket.arrival.to.datetime)
                  .toISOString()
                  .slice(11, 16)}
              </div>
              <div className="ticket__town">{ticket.arrival.to.city.name}</div>
              <div className="ticket__terminal">
                {ticket.arrival.to.railway_station_name} вокзал
              </div>
            </div>
            <div className="ticket__duration-info">
              <div className="ticket__duration-time">
                {getDuration(
                  ticket.arrival.from.datetime,
                  ticket.arrival.to.datetime
                )}
              </div>
              <img
                className="ticket__duration-icon"
                src={arrowLeft}
                alt="Туда"
              />
            </div>
            <div className="ticket__backward-info">
              <div className="ticket__time">
                {fromUnixTime(ticket.arrival.from.datetime)
                  .toISOString()
                  .slice(11, 16)}
              </div>
              <div className="ticket__town">
                {ticket.arrival.from.city.name}
              </div>
              <div className="ticket__terminal">
                {ticket.arrival.from.railway_station_name} вокзал
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="ticket__wrapper-right">
        <ul className="ticket__seats">
          {seatData.map(
            (seat, index) =>
              // если таковые места вообще есть:
              seat.seatData.count !== 0 && (
                <li key={index} className="ticket__seat">
                  <div className="ticket__seat-type">{seat.seatType}</div>
                  <div className="ticket__seat-wrapper">
                    <div className="ticket__seat-count">
                      {seat.seatData.count}
                    </div>
                    <div className="ticket__seat-price-info">
                      <span className="ticket__seat-price-text">от</span>
                      <span className="ticket__seat-price">
                        {seat.seatData.minPrice.toLocaleString('ru-RU')}
                      </span>
                      <span className="ticket__seat-price-currency">₽</span>
                    </div>
                  </div>

                  <TooltipPrice
                    luxPrice={seat.seatData.luxPrice}
                    topPrice={seat.seatData.topPrice}
                    bottomPrice={seat.seatData.bottomPrice}
                    sidePrice={seat.seatData.sidePrice}
                  />
                </li>
              )
          )}
        </ul>

        <div className="ticket__footer">
          <div className="ticket__features">
            {featureData.map(
              ({ condition, icon, alt }, index) =>
                condition && (
                  <img
                    key={index}
                    className="ticket__feature-icon"
                    src={icon}
                    alt={alt}
                    title={alt}
                  />
                )
            )}
          </div>

          {text === 'Выбрать места' && <ChooseSeats index={index} />}
          {text === 'Изменить' && (
            <ChangeData route="/trains" handleClick={handleChangeTrain} />
          )}
        </div>
      </div>
    </article>
  );
};

export default ArticleTicket;
