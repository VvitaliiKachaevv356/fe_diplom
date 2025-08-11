import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import { setArticleBackwardCheckbox } from '../../../../redux/checkboxSlice';
import Arrival from '../../../widgets/TripInfo/Arrival';
import Departure from '../../../widgets/TripInfo/Departure';
import backward from '../../../../assets/backward.svg';
import './articleBackward.css';

const ArticleBackward = () => {
  const dispatch: AppDispatch = useDispatch();

  const { articleBackwardCheckbox } = useSelector(
    (state: RootState) => state.checkbox
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setArticleBackwardCheckbox(event.target.checked));
  };

  return (
    <article className="backward">
      <header className="backward__header">
        <div className="backward__wrapper">
          <img src={backward} alt="Обратно" className="backward__icon" />
          <h3 className="backward__title">обратно</h3>
        </div>

        <input
          id="backward"
          type="checkbox"
          className="backward__checkbox"
          onChange={handleChange}
          checked={articleBackwardCheckbox}
        />
        <label htmlFor="backward" className="backward__label"></label>
      </header>

      <div
        className={
          articleBackwardCheckbox
            ? 'backward__content backward__content_active'
            : 'backward__content'
        }
      >
        <Departure destination="backward" />
        <Arrival destination="backward" />
      </div>
    </article>
  );
};

export default ArticleBackward;
