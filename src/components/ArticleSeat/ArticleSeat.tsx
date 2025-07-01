import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import Carriages from "../Features/booking/Carriages/Carriages";
import CarriageType from "../Features/booking/CarriageType/CarriageType";
import SeatsCount from "../Features/seats/SeatsCount/SeatsCount";
import SeatHeader from "../Features/seats/SeatHeader/SeatHeader";
import TrainInfo from "../TrainInfo/TrainInfo";

import "./articleSeat.css";

interface ArticleSeatProps {
  isForward: boolean;
}

const ArticleSeat: React.FC<ArticleSeatProps> = ({ isForward }) => {
  const titleText = `Выбор мест ${isForward ? "туда" : "обратно"}`;

  const currentCarriageType = useSelector((state: RootState) =>
    isForward
      ? state.departure.currentCarriageType
      : state.arrival.currentCarriageType
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
