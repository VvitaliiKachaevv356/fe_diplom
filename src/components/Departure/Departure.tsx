import SliderTimeRange from '../SliderTimeRange/SliderTimeRange';
import './departure.css';

interface IDepartureProps {
  destination: 'forward' | 'backward';
}

const Departure = ({ destination }: IDepartureProps) => {
  return (
    <div className="departure">
      <h4 className="departure__title">Время отбытия</h4>
      <SliderTimeRange destination={destination} type="departure" />
    </div>
  );
};

export default Departure;
