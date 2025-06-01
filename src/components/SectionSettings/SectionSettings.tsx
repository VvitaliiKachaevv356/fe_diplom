import ArticleBackward from '../ArticleBackward/ArticleBackward';
import ArticleDate from '../ArticleDate/ArticleDate';
import ArticleFeatures from '../ArticleFeatures/ArticleFeatures';
import ArticleForward from '../ArticleForward/ArticleForward';
import ArticlePrice from '../ArticlePrice/ArticlePrice';

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
