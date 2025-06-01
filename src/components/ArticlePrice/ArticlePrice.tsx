import SliderPriceRange from '../SliderPriceRange/SliderPriceRange';

import './articlePrice.css';

const ArticlePrice: React.FC = () => {
  return (
    <article className="price">
      <h3 className="price__title">Стоимость</h3>
      <div className="price__description">
        <span className="price__from">от</span>
        <span className="price__to">до</span>
      </div>
      <SliderPriceRange />
    </article>
  );
};

export default ArticlePrice;