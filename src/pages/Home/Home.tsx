import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import HeaderHome from "../../components/HeaderHome/HeaderHome";
import Line from "../../components/Line/Line";
import SectionAbout from "../../components/SectionAbout/SectionAbout";
import SectionDescription from "../../components/SectionDescription/SectionDescription";
import SectionFeedback from "../../components/SectionFeedback/SectionFeedback";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <HeaderHome />
      <Line />
      <main>
        <SectionAbout />
        <SectionDescription />
        <SectionFeedback />
      </main>
    </>
  );
};

export default Home;
