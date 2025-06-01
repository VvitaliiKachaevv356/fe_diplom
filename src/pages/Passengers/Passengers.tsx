import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "../../components/Header/Header";
import LineCurrent from "../../components/LineCurrent/LineCurrent";
import SectionDetails from "../../components/SectionDetails/SectionDetails";
import SectionPassengers from "../../components/SectionPassengers/SectionPassengers";

const Passengers = () => {
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
      <Header />
      <LineCurrent num={2} />
      <div className="page">
        <aside className="sidebar">
          <SectionDetails />
        </aside>
        <main className="main">
          <SectionPassengers />
        </main>
      </div>
    </>
  );
};

export default Passengers;
