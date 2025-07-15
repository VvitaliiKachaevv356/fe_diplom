import './nextPage.css';

interface INextPageProps {
  text: string;
  isActive: boolean;
  onNextClick: () => void;
}

const NextPage = ({ text, isActive, onNextClick }: INextPageProps) => {
  const basicClass = 'next-page__navigation-link';
  const inactiveClass = 'next-page__navigation-link_inactive';

  return (
    <div className="next-page">
      <a
        className={isActive ? basicClass : `${basicClass} ${inactiveClass}`}
        onClick={onNextClick}
      >
        {text}
      </a>
    </div>
  );
};

export default NextPage;
