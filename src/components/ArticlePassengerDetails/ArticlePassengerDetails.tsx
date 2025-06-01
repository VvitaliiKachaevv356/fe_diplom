import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { setArticlePassengerCheckboxDetails } from '../../redux/checkboxDetailsSlice';
import passenger from '../../assets/passenger.svg';
import './articlePassengerDetails.css';

const ArticlePassengerDetails = () => {
  const dispatch: AppDispatch = useDispatch();

  const { articlePassengerCheckboxDetails } = useSelector(
    (state: RootState) => state.checkboxDetails
  );

  const {
    adults,
    children,
    baby,
    orderList: departureOrderList,
  } = useSelector((state: RootState) => state.departure);

  const { orderList: arrivalOrderList } = useSelector(
    (state: RootState) => state.arrival
  );

  let adultsPrice = 0;
  let childrenPrice = 0;

  departureOrderList.forEach((order) => {
    if (order.is_adult) {
      adultsPrice += order.total_price;
    } else if (order.is_child) {
      childrenPrice += order.total_price;
    }
  });

  arrivalOrderList.forEach((order) => {
    if (order.is_adult) {
      adultsPrice += order.total_price;
    } else if (order.is_child) {
      childrenPrice += order.total_price;
    }
  });

  const data = [
    {
      count: adults.count,
      price: adultsPrice,
      text: adults.count === 1 ? 'Взрослый' : 'Взрослых',
    },
    {
      count: children.count,
      price: childrenPrice,
      text: children.count === 1 ? 'Ребенок' : 'Детских',
    },
    {
      count: baby.count,
      price: 0,
      text: (baby.count === 1 ? 'Ребенок' : 'Детских') + ' (без места)',
    },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setArticlePassengerCheckboxDetails(event.target.checked));
  };

  return (
    <article className="passenger-details">
      <header className="passenger-details__header">
        <div className="passenger-details__wrapper">
          <img
            src={passenger}
            alt="Пассажиры"
            className="passenger-details__icon"
          />
          <h3 className="passenger-details__title">пассажиры</h3>
        </div>

        <input
          id="passenger-details"
          type="checkbox"
          className="passenger-details__checkbox"
          onChange={handleChange}
          checked={articlePassengerCheckboxDetails}
        />
        <label
          htmlFor="passenger-details"
          className="passenger-details__label"
        ></label>
      </header>

      <div
        className={
          articlePassengerCheckboxDetails
            ? 'passenger-details__content passenger-details__content_active'
            : 'passenger-details__content'
        }
      >
        {data.map(
          (passenger, index) =>
            passenger.count !== 0 && (
              <div key={index} className="passenger-details__row">
                <div className="passenger-details__passenger">
                  {`${passenger.count} ${passenger.text}`}
                </div>
                <div className="passenger-details__price">
                  <div className="passenger-details__cash">
                    {passenger.price.toLocaleString('ru-RU')}
                  </div>
                  <div className="passenger-details__currency">₽</div>
                </div>
              </div>
            )
        )}
      </div>
    </article>
  );
};

export default ArticlePassengerDetails;
