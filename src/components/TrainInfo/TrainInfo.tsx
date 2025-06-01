import { fromUnixTime } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import getDeclinedHours from '../../libs/getDeclinedHours';
import getDeclinedMinutes from '../../libs/getDeclinedMinutes';
import arrowLeft from '../../assets/arrow-left.svg';
import arrowRight from '../../assets/arrow-right.svg';
import time from '../../assets/time.svg';
import trainActive from '../../assets/train-active.svg';

import './trainInfo.css';

const TrainInfo = ({ isForward }: { isForward: boolean }) => {
  const { paramStartTown, paramEndTown } = useSelector(
    (state: RootState) => state.params
  );

  const { trains, currentTrainIndex } = useSelector(
    (state: RootState) => state.trains
  );

  const ticket = trains[currentTrainIndex];
  const { departure, arrival } = ticket; // деструктуризация

  const data = {
    number: '',
    startTown: paramStartTown?.name || '',
    endTown: paramEndTown?.name || '',
    startTime: '',
    endTime: '',
    startTerminal: '',
    endTerminal: '',
    hours: '',
    declinedHours: '',
    minutes: '',
    declinedMinutes: '',
  };

  if (isForward) {
    data.number = departure.train.name.split(' - ')[1] + 'C';
    data.startTime = fromUnixTime(departure.from.datetime)
      .toISOString()
      .slice(11, 16);
    data.endTime = fromUnixTime(departure.to.datetime)
      .toISOString()
      .slice(11, 16);
    data.startTerminal = departure.from.railway_station_name;
    data.endTerminal = departure.to.railway_station_name;

    const [hour, minute] = fromUnixTime(departure.duration)
      .toISOString()
      .slice(11, 16)
      .split(':');

    data.hours = Number(hour).toString();
    data.declinedHours = getDeclinedHours(Number(hour));
    data.minutes = Number(minute).toString();
    data.declinedMinutes = getDeclinedMinutes(Number(minute));
  } else {
    if (!arrival) {
      return;
    }

    data.number = arrival.train.name.split(' - ')[1] + 'C';
    data.startTime = fromUnixTime(arrival.from.datetime)
      .toISOString()
      .slice(11, 16);
    data.endTime = fromUnixTime(arrival.to.datetime)
      .toISOString()
      .slice(11, 16);
    data.startTerminal = arrival.from.railway_station_name;
    data.endTerminal = arrival.to.railway_station_name;

    const [hour, minute] = fromUnixTime(arrival.duration)
      .toISOString()
      .slice(11, 16)
      .split(':');

    data.hours = Number(hour).toString();
    data.declinedHours = getDeclinedHours(Number(hour));
    data.minutes = Number(minute).toString();
    data.declinedMinutes = getDeclinedMinutes(Number(minute));
  }

  return (
    <div className="train-info">
      <div className="train-info__wrapper-left">
        <img className="train-info__train-img" src={trainActive} alt="поезд" />
        <div className="train-info__content">
          <div className="train-info__train-number">{data.number}</div>

          {/* NOTE: откуда получать эти данные - ??? */}
          {/* <div className="train-info__train-town-departure">
            <span>Адлер</span>
            <span>→</span>
          </div> */}
          <div className="train-info__train-town-from">
            <span>{isForward ? data.startTown : data.endTown}</span>
            <span>→</span>
          </div>
          <div className="train-info__train-town-to">
            {isForward ? data.endTown : data.startTown}
          </div>
        </div>
      </div>

      <div className="train-info__wrapper-middle">
        <div className="train-info__forward-info">
          <div className="train-info__time">
            {isForward ? data.startTime : data.endTime}
          </div>
          <div className="train-info__town">{data.startTown}</div>
          <div className="train-info__terminal">
            {isForward ? data.startTerminal : data.endTerminal} вокзал
          </div>
        </div>

        <img
          className="train-info__duration-icon"
          src={isForward ? arrowRight : arrowLeft}
          alt={isForward ? 'туда' : 'обратно'}
        />

        <div className="train-info__backward-info">
          <div className="train-info__time">
            {isForward ? data.endTime : data.startTime}
          </div>
          <div className="train-info__town">{data.endTown}</div>
          <div className="train-info__terminal">
            {isForward ? data.endTerminal : data.startTerminal} вокзал
          </div>
        </div>
      </div>

      <div className="train-info__wrapper-right">
        <img src={time} alt="время в пути" className="train-info__time-icon" />
        <div className="train-info__time-content">
          <div className="train-info__hours">
            <span className="train-info__number">{data.hours}</span>
            <span className="train-info__text">{data.declinedHours}</span>
          </div>
          <div className="train-info__minutes">
            <span className="train-info__number">{data.minutes}</span>
            <span className="train-info__text">{data.declinedMinutes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainInfo;
