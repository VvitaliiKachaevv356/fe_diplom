import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CarriageFeatures from '../CarriageFeatures/CarriageFeatures';
import CarriageView from '../CarriageView/CarriageView';
import './carriage.css';

const Carriage = ({ isForward }: { isForward: boolean }) => {
  const {
    activeCarriageIndex,
    currentCarriageType,
    currentTypeCarriagesList,
    wiFiPrice,
    linensPrice,
  } = useSelector((state: RootState) =>
    isForward ? state.departure : state.arrival
  );

  const currentCarriage = currentTypeCarriagesList[activeCarriageIndex]; // выбранный вагон

  // деструктурируем данные:
  const {
    carriage_number,
    top,
    bottom,
    side,
    price,
    top_price,
    bottom_price,
    side_price,
    available_seats,
    have_air_conditioning,
    have_wifi,
    wifi_price,
    is_linens_included,
    linens_price,
  } = currentCarriage.coach;

  const currentCarriageNumber = carriage_number.toString().padStart(2, '0');

  // создаём массив с данными для оптимизации кода:
  const seatTypes = [
    {
      classTypes: ['first'],
      label: 'Люкс',
      count: available_seats,
      price: price,
    },
    {
      classTypes: ['second', 'third'],
      label: 'Верхние',
      count: top,
      price: top_price,
    },
    {
      classTypes: ['second', 'third'],
      label: 'Нижние',
      count: bottom,
      price: bottom_price,
    },
    { classTypes: ['third'], label: 'Боковые', count: side, price: side_price },
    {
      classTypes: ['fourth'],
      label: 'Сидячие',
      count: available_seats,
      price: Math.min(top_price || Infinity, bottom_price || Infinity),
    },
  ];

  const renderSeatsInfo = (
    classTypes: string[],
    label: string,
    count: number,
    index: number
  ) => {
    if (
      count === 0 ||
      currentCarriageType === 'first' ||
      currentCarriageType === 'fourth' ||
      !classTypes.includes(currentCarriageType)
    ) {
      return null;
    }
    return (
      <div key={index} className="carriage__seats-full-info">
        <span className="carriage__seats-full-info-text">{label}</span>
        <span className="carriage__seats-full-info-count">{count}</span>
      </div>
    );
  };

  const renderPriceInfo = (
    classTypes: string[],
    price: number,
    index: number
  ) => {
    if (price === 0 || !classTypes.includes(currentCarriageType)) {
      return null;
    }

    // если в вагоне есть wi-fi и эта услуга подключена:
    const wifi = have_wifi && wiFiPrice ? wiFiPrice : 0;

    // если постельное белье не включено в стоимость изначально и клиент подключил услугу:
    const linens = !is_linens_included && linensPrice ? linensPrice : 0;

    // итоговая стоимость билета со всеми дополнительными опциями:
    const finalPrice = price + wifi + linens;

    return (
      <div key={index} className="carriage__price-info-price">
        <span className="carriage__price-info-count">
          {finalPrice.toLocaleString('ru-RU')}
        </span>
        <span className="carriage__price-info-currency">₽</span>
      </div>
    );
  };

  const featuresData = {
    isForward,
    have_air_conditioning,
    have_wifi,
    wifi_price,
    is_linens_included,
    linens_price,
  };

  return (
    <div className="carriage">
      <div className="carriage__content">
        <div className="carriage__column carriage__column_carriage">
          <span className="carriage__carriage-number">
            {currentCarriageNumber}
          </span>
          <span className="carriage__carriage-text">вагон</span>
        </div>

        <div className="carriage__column carriage__column_seats">
          <div className="carriage__seats-short-info">
            <span className="carriage__seats-short-info-text">Места</span>
            <span className="carriage__seats-short-info-count">
              {available_seats}
            </span>
          </div>

          {/* отрисовываем типы мест - только для купе и платцкарта: */}
          {seatTypes.map(({ classTypes, label, count }, index) =>
            renderSeatsInfo(classTypes, label, count, index)
          )}
        </div>

        <div className="carriage__column carriage__column_price">
          <div className="carriage__price-info-text">Стоимость</div>

          {/* отрисовываем стоимость каждого типа мест: */}
          {seatTypes.map(({ classTypes, price }, index) =>
            renderPriceInfo(classTypes, price, index)
          )}
        </div>

        <div className="carriage__column carriage__column_service">
          <div className="carriage__service-info">
            <span className="carriage__service-info-text">Обслуживание</span>
            <span className="carriage__service-info-company">ФПК</span>
          </div>

          <CarriageFeatures data={featuresData} />
        </div>
      </div>

      <CarriageView isForward={isForward} />
    </div>
  );
};

export default Carriage;
