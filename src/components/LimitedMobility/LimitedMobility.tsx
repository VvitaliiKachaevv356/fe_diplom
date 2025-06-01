import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setLimitedMobility } from '../../redux/passengersSlice';
import './limitedMobility.css';

interface ILimitedMobilityProps {
  index: number;
  limitedMobility: boolean;
}

const LimitedMobility = ({ index, limitedMobility }: ILimitedMobilityProps) => {
  const dispatch: AppDispatch = useDispatch();

  const handleLimitedMobilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const payload = {
      index,
      mobility: event.target.checked,
    };

    dispatch(setLimitedMobility(payload));
  };

  return (
    <div className="limited-mobility">
      <input
        id={`limited-mobility-${index}`} // уникальные for-id для каждой группы радиокнопок
        type="checkbox"
        className="limited-mobility__checkbox visually-hidden"
        onChange={handleLimitedMobilityChange}
        checked={limitedMobility}
      />
      <label
        htmlFor={`limited-mobility-${index}`} // уникальные for-id для каждой радиокнопки
        className="limited-mobility__label"
      >
        ограниченная подвижность
      </label>
    </div>
  );
};

export default LimitedMobility;
