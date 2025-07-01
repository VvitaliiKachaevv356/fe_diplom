import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { setArticleForwardCheckbox } from "../../../redux/checkboxSlice";
import Arrival from "../../Shared/Arrival/Arrival";
import Departure from "../booking/Departure/Departure";
import forward from "../../../assets/forward.svg";
import "./articleForward.css";

const ArticleForward: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const articleForwardCheckbox = useSelector(
    (state: RootState) => state.checkbox.articleForwardCheckbox
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setArticleForwardCheckbox(event.target.checked));
  };

  return (
    <article className="forward">
      <header className="forward__header">
        <div className="forward__wrapper">
          <img
            src={forward}
            alt="В прямом направлении"
            className="forward__icon"
          />{" "}
          {/* Более информативный alt */}
          <h3 className="forward__title">туда</h3>
        </div>
        <input
          id="forward"
          type="checkbox"
          className="forward__checkbox"
          onChange={handleChange}
          checked={articleForwardCheckbox}
        />
        <label
          htmlFor="forward"
          className="forward__label"
          aria-label="Показать/скрыть детали маршрута в прямом направлении"
        ></label>{" "}
        {}
      </header>

      <div
        className={`forward__content ${
          articleForwardCheckbox ? "forward__content_active" : ""
        }`}
      >
        {" "}
        {}
        <Departure destination="forward" />
        <Arrival destination="forward" />
      </div>
    </article>
  );
};

export default ArticleForward;
