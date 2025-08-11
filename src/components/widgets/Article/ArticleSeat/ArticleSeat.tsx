import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

import Carriages from '../../../widgets/Carriage/Carriages/Carriages';
import CarriageType from '../../../widgets/Carriage/CarriageType/CarriageType';
import SeatsCount from '../../../widgets/SeatSelection/SeatsCount';
import SeatHeader from '../../../widgets/SeatSelection/SeatHeader';
import TrainInfo from '../../../widgets/TrainInfo/TrainInfo';

import './articleSeat.css';

const ArticleSeat = ({ isForward }: { isForward: boolean }) => {
  const titleText = `Выбор мест ${isForward ? 'туда' : 'обратно'}`;

  const { currentCarriageType } = useSelector((state: RootState) =>
    isForward ? state.departure : state.arrival
  );

  return (
    <article className="seat">
      <h3 className="visually-hidden">{titleText}</h3>
      <SeatHeader isForward={isForward} />
      <TrainInfo isForward={isForward} />
      <SeatsCount isForward={isForward} />
      <CarriageType isForward={isForward} />
      {currentCarriageType && <Carriages isForward={isForward} />}
    </article>
  );
};

export default ArticleSeat;
