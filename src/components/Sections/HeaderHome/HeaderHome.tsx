import Logo from "../../UI/other/Logo";
import Menu from "../../sections/Menu/Menu";
import SearchForm from "../../widgets/SearchForm/SearchForm";
import Title from "../../UI/text/Title";

import "./headerHome.css";

const HeaderHome = () => {
  return (
    <header id="header-home" className="header-home">
      <div className="header-home__top-container">
        <Logo />
      </div>
      <Menu />
      <div className="header-home__content">
        <Title />
        <SearchForm />
      </div>
    </header>
  );
};

export default HeaderHome;


