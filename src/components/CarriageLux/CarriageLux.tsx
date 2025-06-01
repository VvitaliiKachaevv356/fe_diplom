import { IMyCarriageProps } from '../../models/models';
import CarriageNumber from '../CarriageNumber/CarriageNumber';
import CarriageTotalPrice from '../CarriageTotalPrice/CarriageTotalPrice';
import PotentialPassengers from '../PotentialPassengers/PotentialPassengers';

import carriageLux from '../../assets/carriage-compartment-lux.svg';
import './carriageLux.css';

const CarriageLux = ({ data }: { data: IMyCarriageProps }) => {
  // деструктурируем данные:
  const {
    isForward,
    baby,
    currentSeats,
    carriage_number,
    price,
    have_wifi,
    wiFiPrice,
    is_linens_included,
    linensPrice,
    onSeatClick,
  } = data;

  const priceTooltip = () => {
    const wifi = have_wifi ? wiFiPrice : 0;
    const linens = !is_linens_included ? linensPrice : 0;

    const priceWithFeatures = price + wifi + linens;

    return baby.isActive ? 0 : priceWithFeatures; // младенцы едут бесплатно !!!
  };

  return (
    <div className="carriage-lux">
      <PotentialPassengers />

      <img className="carriage-lux__img" src={carriageLux} alt="lux" />

      <CarriageNumber carriageNumber={carriage_number} />

      <ul className="carriage-lux__scheme">
        {currentSeats.map((seat) => (
          <li
            key={seat.index}
            className={`carriage-lux__seat carriage-lux__seat_${seat.index}${
              seat.available ? ' carriage-lux__seat_available' : ''
            }${seat.isActive ? ' carriage-lux__seat_active' : ''}`}
            title={priceTooltip().toLocaleString('ru-RU')}
            onClick={
              seat.available || seat.isActive
                ? () => onSeatClick(seat.index, priceTooltip(), seat.isActive)
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

export default CarriageLux;
