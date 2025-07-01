import Slider from "../../../Slider/Slider";
import compartmentIcon from "../../../../assets/compartment.svg";
import platzkartIcon from "../../../../assets/platzkart.svg";
import seatIcon from "../../../../assets/seat.svg";
import luxIcon from "../../../../assets/lux.svg";
import wiFiIcon from "../../../../assets/wi-fi.svg";
import expressIcon from "../../../../assets/express.svg";
import "./articleFeatures.css";

const ArticleFeatures: React.FC = () => {
  return (
    <article className="features">
      <h3 className="visually-hidden">Настройка фич</h3>

      <ul className="features__list">
        <li className="features__item">
          <div className="features__wrapper">
            <div className="features__icon-wrapper">
              <img
                className="features__icon"
                src={compartmentIcon}
                alt="Купе"
              />
            </div>
            <p className="features__text">Купе</p>
          </div>
          <Slider forId="slider-compartment" />
        </li>

        <li className="features__item">
          <div className="features__wrapper">
            <div className="features__icon-wrapper">
              <img
                className="features__icon"
                src={platzkartIcon}
                alt="Платцкарт"
              />
            </div>
            <p className="features__text">Платцкарт</p>
          </div>
          <Slider forId="slider-platzkart" />
        </li>

        <li className="features__item">
          <div className="features__wrapper">
            <div className="features__icon-wrapper">
              <img className="features__icon" src={seatIcon} alt="Сидячий" />
            </div>
            <p className="features__text">Сидячий</p>
          </div>
          <Slider forId="slider-seat" />
        </li>

        <li className="features__item">
          <div className="features__wrapper">
            <div className="features__icon-wrapper">
              <img className="features__icon" src={luxIcon} alt="Люкс" />
            </div>
            <p className="features__text">Люкс</p>
          </div>
          <Slider forId="slider-lux" />
        </li>

        <li className="features__item">
          <div className="features__wrapper">
            <div className="features__icon-wrapper">
              <img className="features__icon" src={wiFiIcon} alt="Wi-Fi" />
            </div>
            <p className="features__text">Wi-Fi</p>
          </div>
          <Slider forId="slider-wiFi" />
        </li>

        <li className="features__item">
          <div className="features__wrapper">
            <div className="features__icon-wrapper">
              <img
                className="features__icon"
                src={expressIcon}
                alt="Экспресс"
              />
            </div>
            <p className="features__text">Экспресс</p>
          </div>
          <Slider forId="slider-express" />
        </li>
      </ul>
    </article>
  );
};

export default ArticleFeatures;
