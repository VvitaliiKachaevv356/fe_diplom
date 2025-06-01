import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import LineCurrent from "../../components/LineCurrent/LineCurrent";
import SectionDetails from "../../components/SectionDetails/SectionDetails";
import SectionPayment from "../../components/SectionPayment/SectionPayment";

const Payment = () => {
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
      <LineCurrent num={3} />
      <div className="page">
        <aside className="sidebar">
          <SectionDetails />
        </aside>
        <main className="main">
          <SectionPayment />
        </main>
      </div>
    </>
  );
};

export default Payment;
