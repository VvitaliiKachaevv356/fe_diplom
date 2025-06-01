import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './carriageTotalPrice.css';

const CarriageTotalPrice = ({ isForward }: { isForward: boolean }) => {
  const { orderList } = useSelector((state: RootState) =>
    isForward ? state.departure : state.arrival
  );

  const price = orderList.reduce((acc, item) => acc + item.total_price, 0);

  return (
    <div className="carriage-total-price">
      <span className="carriage-total-price__cost">
        {price.toLocaleString('ru-RU')}
      </span>
      <span className="carriage-total-price__currency">₽</span>
    </div>
  );
};

export default CarriageTotalPrice;
