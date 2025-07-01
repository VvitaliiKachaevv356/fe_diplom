import { Link } from 'react-router-dom';
import './errorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error-page__title">Oops!</h1>
      <p className="error-page__text">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="error-page__text">Please try again later.</p>
      <Link to="/" className="error-page__link">
        Home
      </Link>
    </div>
  );
};

export default ErrorPage;
