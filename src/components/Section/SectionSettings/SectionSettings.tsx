import ArticleBackward from '../../Features/ArticleBackward/ArticleBackward';
import ArticleDate from '../../Shared/ArticleDate/ArticleDate';
import ArticleFeatures from '../../Features/Trains/ArticleFeatures/ArticleFeatures';
import ArticleForward from '../../Features/ArticleForward/ArticleForward';
import ArticlePrice from '../../Features/price/ArticlePrice/ArticlePrice';

import './sectionSettings.css';

const SectionSettings = () => {
  return (
    <section className="settings">
      <h2 className="visually-hidden">Настройки</h2>
      <ArticleDate />
      <ArticleFeatures />
      <ArticlePrice />
      <ArticleForward />
      <ArticleBackward />
    </section>
  );
};

export default SectionSettings;
