import SliderTimeRange from '../../UI/other/SliderTimeRange.tsx';
import './arrival.css';

interface IArrivalProps {
  destination: 'forward' | 'backward';
}

const Arrival = ({ destination }: IArrivalProps) => {
  return (
    <div className="arrival">
      <h4 className="arrival__title">Время прибытия</h4>
      <SliderTimeRange destination={destination} type="arrival" />
    </div>
  );
};

export default Arrival;
