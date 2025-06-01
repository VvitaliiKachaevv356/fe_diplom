import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setСash } from '../../redux/paymentSlice';
import './paymentMethod.css';

const PaymentMethod = ({ cash }: { cash: boolean }) => {
  const dispatch: AppDispatch = useDispatch();

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isCash = event.target.value === 'cash';

    // изменяем данные в store только если данные изменились:
    if (isCash !== cash) {
      dispatch(setСash(isCash));
    }
  };

  return (
    <article className="payment-method">
      <h3 className="payment-method__title">Способ оплаты</h3>

      <div className="payment-method__online">
        <input
          id="online"
          className="payment-method__input visually-hidden"
          type="radio"
          name="payment-method"
          value="online"
          checked={!cash} // если cash == false, то оплата online
          onChange={handlePaymentMethodChange}
        />
        <label className="payment-method__label" htmlFor="online">
          Онлайн
        </label>

        {/* в ТЗ нет условия выбирать конкретный способ онлайн-оплаты... */}
        <ul className="payment-method__online-list">
          <li className="payment-method__online-item">Банковской картой</li>
          <li className="payment-method__online-item">PayPal</li>
          <li className="payment-method__online-item">Visa QIWI Wallet</li>
        </ul>
      </div>

      <div className="payment-method__cash">
        <input
          className="payment-method__input visually-hidden"
          id="cash"
          type="radio"
          name="payment-method"
          value="cash"
          checked={cash} // если cash == true, то оплата наличными
          onChange={handlePaymentMethodChange}
        />
        <label className="payment-method__label" htmlFor="cash">
          Наличными
        </label>
      </div>
    </article>
  );
};

export default PaymentMethod;
