import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import SearchForm from '../SearchForm/SearchForm';

import './header.css';

const Header = () => {
  return (
    <header id="header" className="header">
      <div className="header__top-container">
        <Logo />
      </div>
      <Menu />
      <div className="header__content">
        <SearchForm />
      </div>
    </header>
  );
};

export default Header;
