import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import Header from "../../components/Header/Header";
import LineCurrent from "../../components/LineCurrent/LineCurrent";
import Loader from "../../components/Loader/Loader";
import SectionLastTickets from "../../components/SectionLastTickets/SectionLastTickets";
import SectionSeats from "../../components/SectionSeats/SectionSeats";
import SectionSettings from "../../components/SectionSettings/SectionSettings";

const Seats = () => {
  const location = useLocation();

  const { forwardCarriagesLoading, backwardCarriagesLoading } = useSelector(
    (state: RootState) => state.carriages
  );

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
      {forwardCarriagesLoading || backwardCarriagesLoading ? (
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
              <SectionSeats />
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default Seats;
