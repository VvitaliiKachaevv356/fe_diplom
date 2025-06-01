import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setGender } from '../../redux/passengersSlice';
import './gender.css';

interface IGenderProps {
  index: number;
  gender: boolean;
}

const Gender = ({ index, gender }: IGenderProps) => {
  const dispatch: AppDispatch = useDispatch();

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const isMale = value === 'male';

    // изменяем данные в store только если данные изменились:
    if (isMale !== gender) {
      dispatch(setGender({ index, gender: isMale }));
    }
  };

  return (
    <div className="gender">
      <label htmlFor={`male-${index}`} className="gender__title">
        Пол
      </label>

      <div className="gender__switcher">
        <input
          className="gender__input visually-hidden"
          id={`male-${index}`} // уникальные for-id для каждой группы радиокнопок
          type="radio"
          name={`gender-${index}`} // уникальное имя для каждой группы радиокнопок
          value="male"
          checked={gender} // true - для 'male', false - для 'female'
          onChange={handleGenderChange}
        />
        <label
          className="gender__label gender__label_male"
          htmlFor={`male-${index}`} // уникальные for-id для каждой группы радиокнопок
        >
          М
        </label>

        <input
          className="gender__input visually-hidden"
          id={`female-${index}`} // уникальные for-id для каждой группы радиокнопок
          type="radio"
          name={`gender-${index}`} // Уникальное имя для каждой группы радиокнопок
          value="female"
          checked={!gender} // true - для 'male', false - для 'female'
          onChange={handleGenderChange}
        />
        <label
          className="gender__label gender__label_female"
          htmlFor={`female-${index}`} // уникальные for-id для каждой группы радиокнопок
        >
          Ж
        </label>
      </div>
    </div>
  );
};

export default Gender;
