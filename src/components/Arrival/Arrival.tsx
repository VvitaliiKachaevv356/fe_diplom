import SliderTimeRange from "../SliderTimeRange/SliderTimeRange";
import "./arrival.css";

interface IArrivalProps {
  destination: "forward" | "backward";
}

const Arrival: React.FC<IArrivalProps> = ({ destination }) => (
  <div className="arrival">
    <h4 className="arrival__title">Время прибытия</h4>
    <SliderTimeRange destination={destination} type="arrival" />
  </div>
);

export default Arrival;
