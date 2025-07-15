import { Link } from 'react-router-dom';
import './changeData.css';

interface IChangeDataProps {
  route: string;
  handleClick?: () => void;
}

const ChangeData = ({ route, handleClick }: IChangeDataProps) => {
  return (
    <div className="change-data">
      <Link className="change-data__link" to={route} onClick={handleClick}>
        Изменить
      </Link>
    </div>
  );
};

export default ChangeData;
