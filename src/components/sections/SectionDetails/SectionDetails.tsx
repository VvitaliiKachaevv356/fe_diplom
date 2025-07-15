import ArticleBackwardDetails from '../../widgets/Article/ArticleBackwardDetails/ArticleBackwardDetails';
import ArticleForwardDetails from '../../widgets/Article/ArticleForwardDetails/ArticleForwardDetails';
import ArticlePassengerDetails from '../../widgets/Article/ArticlePassengerDetails/ArticlePassengerDetails';
import ArticlePriceDetails from '../../widgets/Article/ArticlePriceDetails/ArticlePriceDetails';

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
