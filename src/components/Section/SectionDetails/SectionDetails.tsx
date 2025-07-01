import ArticleBackwardDetails from '../../Features/ArticleBackwardDetails/ArticleBackwardDetails';
import ArticleForwardDetails from '../../Features/booking/ArticleForwardDetails/ArticleForwardDetails';
import ArticlePassengerDetails from '../../Features/passenger/ArticlePassengerDetails/ArticlePassengerDetails';
import ArticlePriceDetails from '../../Features/price/ArticlePriceDetails/ArticlePriceDetails';

import './sectionDetails.css';

const SectionDetails = () => {
  return (
    <section className="details">
      <h2 className="details__title">Детали поездки</h2>
      <ArticleForwardDetails />
      <ArticleBackwardDetails />
      <ArticlePassengerDetails />
      <ArticlePriceDetails />
    </section>
  );
};

export default SectionDetails;
