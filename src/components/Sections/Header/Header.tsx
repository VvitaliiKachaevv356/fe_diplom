import Logo from '../../UI/other/Logo';
import Menu from '../../sections/Menu/Menu';
import SearchForm from '../../widgets/SearchForm/SearchForm';

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
