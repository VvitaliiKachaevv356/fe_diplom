import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../redux/store";

import Header from "../../components/Header/Header";
import LineCurrent from "../../components/LineCurrent/LineCurrent";
import Loader from "../../components/Loader/Loader";
import SectionConfirmation from "../../components/SectionConfirmation/SectionConfirmation";
import SectionDetails from "../../components/SectionDetails/SectionDetails";

const Confirmation = () => {
  const location = useLocation();
  const { orderIsLoading } = useSelector((state: RootState) => state.order);

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
      {orderIsLoading ? (
        <Loader />
      ) : (
        <>
          <LineCurrent num={4} />
          <div className="page">
            <aside className="sidebar">
              <SectionDetails />
            </aside>
            <main className="main">
              <SectionConfirmation />
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default Confirmation;
