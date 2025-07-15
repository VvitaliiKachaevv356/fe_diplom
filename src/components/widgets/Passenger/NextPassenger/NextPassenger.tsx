import './nextPassenger.css';

interface INextPassengerProps {
  onClickHandler: () => void;
}

const NextPassenger = ({ onClickHandler }: INextPassengerProps) => {
  return (
    <div className="next-passenger" onClick={onClickHandler}>
      Следующий пассажир
    </div>
  );
};

export default NextPassenger;
