import { useSelector } from 'react-redux';
import useGetTotalPrice from '../../../../hooks/useGetTotalPrice';
import { RootState } from '../../../../redux/store';
import ChangeData from '../../../widgets/ProfileSetting/ChangeData/ChangeData';
import TitleCheck from '../../../UI/text/TitleCheck/TitleCheck';
import avatar from '../../../../assets/avatar.svg';
import './articleCheckPassengers.css';

const ArticleCheckPassengers = () => {
  const { passengersList } = useSelector(
    (state: RootState) => state.passengers
  );

  const price = useGetTotalPrice();

  return (
    <article className="check-passengers">
      <TitleCheck text="Пассажиры" />

      <div className="check-passengers__container">
        <ul className="check-passengers__list">
          {passengersList.map((passenger, index) => {
            const { data } = passenger;

            const name = `${data.lastName.value} ${data.firstName.value} ${data.middleName.value}`;
            const gender = data.gender ? 'мужской' : 'женский';
            const document = `${data.document} ${
              data.document === 'Паспорт РФ'
                ? `${data.passportSeries.value} ${data.passportNumber.value}`
                : data.certificateNumber.value.replace(
                    /([IVXLCDM]{1,4})([А-Я]{2})(\d{6})/,
                    '$1 $2 $3'
                  )
            }`;

            return (
              <li key={index} className="check-passengers__item">
                <div className="check-passengers__avatar">
                  <img
                    className="check-passengers__img"
                    src={avatar}
                    alt="avatar"
                  />
                  <span className="check-passengers__type">{data.type}</span>
                </div>

                <div className="check-passengers__info">
                  <div className="check-passengers__full-name">{name}</div>
                  <div className="check-passengers__sex">{`Пол ${gender}`}</div>
                  <div className="check-passengers__date-of-birth">
                    {`Дата рождения ${data.birthdate.value}`}
                  </div>
                  <div className="check-passengers__document">{document}</div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="check-passengers__sidebar">
          <div className="check-passengers__total-price">
            <div className="check-passengers__text">Всего</div>
            <div className="check-passengers__price">
              <span className="check-passengers__amount">
                {price.toLocaleString('ru-RU')}
              </span>
              <span className="check-passengers__currency">₽</span>
            </div>
          </div>

          <ChangeData route="/passengers" />
        </div>
      </div>
    </article>
  );
};

export default ArticleCheckPassengers;
