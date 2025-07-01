import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { setArticleBackwardCheckbox } from "../../../redux/checkboxSlice";
import Arrival from "../../Shared/Arrival/Arrival";
import Departure from "../booking/Departure/Departure";
import backwardIcon from '../../../assets/backward.svg';
import "./articleBackward.css";

const ArticleBackward: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const articleBackwardCheckbox = useSelector(
    (state: RootState) => state.checkbox.articleBackwardCheckbox
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setArticleBackwardCheckbox(event.target.checked));
  };

  return (
    <article className="backward">
      <header className="backward__header">
        <div className="backward__wrapper">
          <img
            src={backwardIcon}
            alt="В обратном направлении"
            className="backward__icon"
          />{" "}
          {/* Более информативный alt */}
          <h3 className="backward__title">обратно</h3>
        </div>
        <input
          id="backward"
          type="checkbox"
          className="backward__checkbox"
          onChange={handleChange}
          checked={articleBackwardCheckbox}
        />
        <label
          htmlFor="backward"
          className="backward__label"
          aria-label="Показать/скрыть детали маршрута в обратном направлении"
        ></label>{" "}
        {/* Добавлено aria-label */}
      </header>

      <div
        className={`backward__content ${
          articleBackwardCheckbox ? "backward__content_active" : ""
        }`}
      >
        {" "}
        {/* Упрощен синтаксис классов */}
        <Departure destination="backward" />
        <Arrival destination="backward" />
      </div>
    </article>
  );
};

export default ArticleBackward;
