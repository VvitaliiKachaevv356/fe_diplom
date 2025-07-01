import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import ArticleTicket from "../../booking/ArticleTicket/ArticleTicket";
import TitleCheck from "../../../TitleCheck/TitleCheck";
import "./articleCheckTrain.css";
const ArticleCheckTrain: React.FC = () => {
  const currentTrainIndex = useSelector(
    (state: RootState) => state.trains.currentTrainIndex
  );

  return (
    <article className="check-train">
      <TitleCheck text="Поезд" />
      <ArticleTicket index={currentTrainIndex} text="Изменить" />
    </article>
  );
};

export default ArticleCheckTrain;
