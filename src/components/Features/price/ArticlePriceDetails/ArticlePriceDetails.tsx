import useGetTotalPrice from "../../../../hooks/useGetTotalPrice";
import "./articlePriceDetails.css";

const ArticlePriceDetails: React.FC = () => {
  const price = useGetTotalPrice();

  return (
    <article className="price-details">
      <h3 className="price-details__title">Итого</h3>
      <span className="price-details__price">
        <span className="price-details__cash">
          {price.toLocaleString("ru-RU")}
        </span>
        <span className="price-details__currency">₽</span>
      </span>
    </article>
  );
};

export default ArticlePriceDetails;
