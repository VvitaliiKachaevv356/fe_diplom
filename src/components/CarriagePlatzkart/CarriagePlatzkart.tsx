import { IMyCarriageProps } from '../../models/models';
import CarriageNumber from '../CarriageNumber/CarriageNumber';
import CarriageTotalPrice from '../CarriageTotalPrice/CarriageTotalPrice';
import PotentialPassengers from '../PotentialPassengers/PotentialPassengers';

import carriagePlatzkart from '../../assets/carriage-platzkart.svg';
import './carriagePlatzkart.css';

const CarriagePlatzkart = ({ data }: { data: IMyCarriageProps }) => {
  // деструктурируем данные:
  const {
    isForward,
    baby,
    currentSeats,
    carriage_number,
    top_price,
    bottom_price,
    side_price,
    have_wifi,
    wiFiPrice,
    is_linens_included,
    linensPrice,
    onSeatClick,
  } = data;

  const priceTooltip = (num: number) => {
    let price = 0;

    if (num > 32) {
      price = side_price;
    } else {
      price = num % 2 ? bottom_price : top_price;
    }

    const wifi = have_wifi ? wiFiPrice : 0;
    const linens = !is_linens_included ? linensPrice : 0;
    const priceWithFeatures = price + wifi + linens;

    return baby.isActive ? 0 : priceWithFeatures; // младенцы едут бесплатно !!!
  };

  return (
    <div className="carriage-platzkart">
      <PotentialPassengers />

      <img
        className="carriage-platzkart__img"
        src={carriagePlatzkart}
        alt="platzkart"
      />

      <CarriageNumber carriageNumber={carriage_number} />

      <ul className="carriage-platzkart__scheme">
        {currentSeats.map((seat) => (
          <li
            key={seat.index}
            className={`carriage-platzkart__seat carriage-platzkart__seat_${
              seat.index
            }${seat.available ? ' carriage-platzkart__seat_available' : ''}${
              seat.isActive ? ' carriage-platzkart__seat_active' : ''
            }`}
            title={priceTooltip(seat.index).toLocaleString('ru-RU')}
            onClick={
              seat.available || seat.isActive
                ? () =>
                    onSeatClick(
                      seat.index,
                      priceTooltip(seat.index),
                      seat.isActive
                    )
                : undefined
            }
          >
            {seat.index}
          </li>
        ))}
      </ul>

      <CarriageTotalPrice isForward={isForward} />
    </div>
  );
};

export default CarriagePlatzkart;
