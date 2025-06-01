import ArticleBackwardDetails from '../ArticleBackwardDetails/ArticleBackwardDetails';
import ArticleForwardDetails from '../ArticleForwardDetails/ArticleForwardDetails';
import ArticlePassengerDetails from '../ArticlePassengerDetails/ArticlePassengerDetails';
import ArticlePriceDetails from '../ArticlePriceDetails/ArticlePriceDetails';

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
