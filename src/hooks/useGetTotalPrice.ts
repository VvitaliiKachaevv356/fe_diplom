import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// кастомный хук подсчёта полной стоимости заказа:
const useGetTotalPrice = () => {
  const { orderList: departureOrderList } = useSelector(
    (state: RootState) => state.departure
  );

  const { orderList: arrivalOrderList } = useSelector(
    (state: RootState) => state.arrival
  );

  // useMemo -> цена пересчитывается только при изменении данных о заказах, а не при каждом рендере:
  const price = useMemo(() => {
    const departurePrice = departureOrderList.reduce(
      (acc, item) => acc + item.total_price,
      0
    );

    // если билета обратно нет, то стоимость билета - 0₽ (начальное значение аккумулятора):
    const arrivalPrice = arrivalOrderList.reduce(
      (acc, item) => acc + item.total_price,
      0
    );

    return departurePrice + arrivalPrice;
  }, [departureOrderList, arrivalOrderList]);

  return price;
};

export default useGetTotalPrice;
