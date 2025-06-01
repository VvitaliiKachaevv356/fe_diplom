import { useSelector } from 'react-redux';
import getDeclinedPeople from '../../libs/getDeclinedPeople';
import { RootState } from '../../redux/store';
import './potentialPassengers.css';

const PotentialPassengers = () => {
  const { currentPotentialPassengersCount: count } = useSelector(
    (state: RootState) => state.trains
  );

  return (
    <div className="potential-passengers">
      <div className="potential-passengers__info">
        {`${count} ${getDeclinedPeople(count)} 
        выбира${count === 1 ? 'ет' : 'ют'} 
        места в этом поезде`}
      </div>
    </div>
  );
};

export default PotentialPassengers;
