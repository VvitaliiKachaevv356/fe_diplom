import MyDatePicker from "../MyDatePicker/MyDatePicker";
import "./articleDate.css";
const ArticleDate: React.FC = () => {
  return (
    <article className="date">
      <h3 className="visually-hidden">Настройка даты</h3>

      <div className="date__container">
        <div className="date__type">Дата поездки</div>
        <MyDatePicker isStart isInForm={false} />
      </div>

      <div className="date__container">
        <div className="date__type">Дата возвращения</div>
        <MyDatePicker isStart={false} isInForm={false} />
      </div>
    </article>
  );
};

export default ArticleDate;
