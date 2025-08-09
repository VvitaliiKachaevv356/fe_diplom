import ArticleBackward from '../../widgets/Article/ArticleBackward/ArticleBackward';
import ArticleDate from '../../widgets/Article/ArticleDate/ArticleDate';
import ArticleFeatures from '../../widgets/Article/ArticleFeatures/ArticleFeatures';
import ArticleForward from '../../widgets/Article/ArticleForward/ArticleForward';
import ArticlePrice from '../../widgets/Article/ArticlePrice/ArticlePrice';

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
