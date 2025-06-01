import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
  setArrivalWiFiPrice,
  setArrivalLinensPrice,
} from '../../redux/arrivalSlice';
import {
  setDepartureWiFiPrice,
  setDepartureLinensPrice,
} from '../../redux/departureSlice';
import './carriageFeatures.css';

interface ICarriageFeaturesProps {
  isForward: boolean;
  have_air_conditioning: boolean;
  have_wifi: boolean;
  wifi_price: number;
  is_linens_included: boolean;
  linens_price: number;
}

const CarriageFeatures = ({ data }: { data: ICarriageFeaturesProps }) => {
  const dispatch: AppDispatch = useDispatch();

  const {
    isForward,
    have_air_conditioning,
    have_wifi,
    wifi_price,
    is_linens_included,
    linens_price,
  } = data;

  const { baby, wiFiPrice, linensPrice } = useSelector((state: RootState) =>
    isForward ? state.departure : state.arrival
  );

  // подключение/отключение услуги wi-fi:
  const handleChooseWifi = () => {
    const price = wiFiPrice ? 0 : wifi_price;

    dispatch(
      isForward ? setDepartureWiFiPrice(price) : setArrivalWiFiPrice(price)
    );
  };

  // подключение/отключение услуги постельного белья:
  const handleChooseLinens = () => {
    const price = linensPrice ? 0 : linens_price || 10; // NOTE: защита от кривого бэка -> min=10₽

    dispatch(
      isForward ? setDepartureLinensPrice(price) : setArrivalLinensPrice(price)
    );
  };

  return (
    <ul className="carriage-features">
      {/* если кондиционер есть в вагоне, то он автоматически включен в стоимость: */}
      {have_air_conditioning && (
        <li
          className="carriage-features__item carriage-features__item_air-condition_included"
          title="кондиционер включен в стоимость"
        ></li>
      )}

      {/* если билет заказывается на младенца, то нельзя подключить платные опции! */}
      {/* если в вагоне есть wi-fi и стоимость не равна нулю, то услуга выбрана (_active): */}
      {have_wifi && !baby.isActive && (
        <li
          className={`carriage-features__item ${
            wiFiPrice
              ? 'carriage-features__item_wifi_active'
              : 'carriage-features__item_wifi'
          }
          `}
          title={wiFiPrice ? 'wi-fi подключен' : 'wi-fi отключен'}
          onClick={handleChooseWifi}
        ></li>
      )}

      {/* если билет заказывается на младенца, то нельзя подключить платные опции! */}
      {/* если постельное белье включено в стоимость: */}
      {is_linens_included ? (
        <li
          className="carriage-features__item carriage-features__item_bed-sheets_included"
          title="постельное белье включено в стоимость"
        ></li>
      ) : (
        !baby.isActive && (
          <li
            className={`carriage-features__item ${
              linensPrice
                ? 'carriage-features__item_bed-sheets_active'
                : 'carriage-features__item_bed-sheets'
            }
          `}
            title={
              linensPrice
                ? 'постельное белье подключено'
                : 'постельное белье отключено'
            }
            onClick={handleChooseLinens}
          ></li>
        )
      )}

      {/* кипяток автоматически включен в стоимость, т.к. данных о нём с бэка не поступает: */}
      <li
        className="carriage-features__item carriage-features__item_tea_included"
        title="кипяток включен в стоимость"
      ></li>
    </ul>
  );
};

export default CarriageFeatures;
