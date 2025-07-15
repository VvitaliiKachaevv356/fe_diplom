import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import { setArticleForwardCheckbox } from '../../../../redux/checkboxSlice';
import Arrival from '../../../widgets/TripInfo/Arrival/Arrival';
import Departure from '../../../widgets/TripInfo/Departure/Departure';
import forward from '../../../../assets/forward.svg';
import './articleForward.css';

const ArticleForward = () => {
  const dispatch: AppDispatch = useDispatch();

  const { articleForwardCheckbox } = useSelector(
    (state: RootState) => state.checkbox
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setArticleForwardCheckbox(event.target.checked));
  };

  return (
    <article className="forward">
      <header className="forward__header">
        <div className="forward__wrapper">
          <img src={forward} alt="Туда" className="forward__icon" />
          <h3 className="forward__title">туда</h3>
        </div>

        <input
          id="forward"
          type="checkbox"
          className="forward__checkbox"
          onChange={handleChange}
          checked={articleForwardCheckbox}
        />
        <label htmlFor="forward" className="forward__label"></label>
      </header>

      <div
        className={
          articleForwardCheckbox
            ? 'forward__content forward__content_active'
            : 'forward__content'
        }
      >
        <Departure destination="forward" />
        <Arrival destination="forward" />
      </div>
    </article>
  );
};

export default ArticleForward;
