import './tooltipPrice.css';

interface ITooltipPriceProps {
  luxPrice?: number; // цена за 1 люксовое место
  topPrice?: number; // цена за 1 верхнее место
  bottomPrice?: number; // цена за 1 нижнее место
  sidePrice?: number; // цена за 1 сидячее место
}

const TooltipPrice = (props: ITooltipPriceProps) => {
  const { luxPrice, topPrice, bottomPrice, sidePrice } = props;

  return (
    <div className="tooltip-price">
      <div className="tooltip-price__arrow" />
      <ul className="tooltip-price__list">
        {/* Люксовые места -> только в вагоне типа СВ: */}
        {luxPrice && luxPrice !== +Infinity && (
          <li className="tooltip-price__item">
            <span className="tooltip-price__text">люкс</span>
            <span className="tooltip-price__price-container">
              <span className="tooltip-price__price">{luxPrice}</span>
              <span className="tooltip-price__currency">₽</span>
            </span>
          </li>
        )}

        {/* Верхние места: */}
        {topPrice && topPrice !== +Infinity && (
          <li className="tooltip-price__item">
            <span className="tooltip-price__text">верхние</span>
            <span className="tooltip-price__price-container">
              <span className="tooltip-price__price">{topPrice}</span>
              <span className="tooltip-price__currency">₽</span>
            </span>
          </li>
        )}

        {/* Нижние места: */}
        {bottomPrice && bottomPrice !== +Infinity && (
          <li className="tooltip-price__item">
            <span className="tooltip-price__text">нижние</span>
            <span className="tooltip-price__price-container">
              <span className="tooltip-price__price">{bottomPrice}</span>
              <span className="tooltip-price__currency">₽</span>
            </span>
          </li>
        )}

        {/* Боковые места -> только в платцкарте: */}
        {sidePrice && sidePrice !== +Infinity && (
          <li className="tooltip-price__item">
            <span className="tooltip-price__text">боковые</span>
            <span className="tooltip-price__price-container">
              <span className="tooltip-price__price">{sidePrice}</span>
              <span className="tooltip-price__currency">₽</span>
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TooltipPrice;
