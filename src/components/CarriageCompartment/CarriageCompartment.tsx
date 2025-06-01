import { IMyCarriageProps } from '../../models/models';
import CarriageNumber from '../CarriageNumber/CarriageNumber';
import CarriageTotalPrice from '../CarriageTotalPrice/CarriageTotalPrice';
import PotentialPassengers from '../PotentialPassengers/PotentialPassengers';

import carriageCompartment from '../../assets/carriage-compartment-lux.svg';
import './carriageCompartment.css';

const CarriageCompartment = ({ data }: { data: IMyCarriageProps }) => {
  // деструктурируем данные:
  const {
    isForward,
    baby,
    currentSeats,
    carriage_number,
    top_price,
    bottom_price,
    have_wifi,
    wiFiPrice,
    is_linens_included,
    linensPrice,
    onSeatClick,
  } = data;

  const priceTooltip = (num: number) => {
    const price = num % 2 ? bottom_price : top_price;
    const wifi = have_wifi ? wiFiPrice : 0;
    const linens = !is_linens_included ? linensPrice : 0;

    const priceWithFeatures = price + wifi + linens;

    return baby.isActive ? 0 : priceWithFeatures; // младенцы едут бесплатно !!!
  };

  return (
    <div className="carriage-compartment">
      <PotentialPassengers />

      <img
        className="carriage-compartment__img"
        src={carriageCompartment}
        alt="compartment"
      />

      <CarriageNumber carriageNumber={carriage_number} />

      <ul className="carriage-compartment__scheme">
        {currentSeats.map((seat) => (
          <li
            key={seat.index}
            className={`carriage-compartment__seat carriage-compartment__seat_${
              seat.index
            }${seat.available ? ' carriage-compartment__seat_available' : ''}${
              seat.isActive ? ' carriage-compartment__seat_active' : ''
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

export default CarriageCompartment;
