import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import Header from "../../components/Header/Header";
import LineCurrent from "../../components/LineCurrent/LineCurrent";
import Loader from "../../components/Loader/Loader";
import SectionLastTickets from "../../components/SectionLastTickets/SectionLastTickets";
import SectionSettings from "../../components/SectionSettings/SectionSettings";
import SectionTickets from "../../components/SectionTickets/SectionTickets";

const Trains = () => {
  const location = useLocation();
  const { trainsLoading } = useSelector((state: RootState) => state.trains);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Header />
      {trainsLoading ? (
        <Loader />
      ) : (
        <>
          <LineCurrent num={1} />
          <div className="page">
            <aside className="sidebar">
              <SectionSettings />
              <SectionLastTickets />
            </aside>
            <main className="main">
              <SectionTickets />
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default Trains;
