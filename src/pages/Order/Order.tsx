import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import HeaderOrder from "../../components/HeaderOrder/HeaderOrder";
import SectionOrder from "../../components/SectionOrder/SectionOrder";

import "./order.css";

const Order = () => {
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
      <HeaderOrder />
      <main className="order-page">
        <div className="order-page__container">
          <SectionOrder />
        </div>
      </main>
    </>
  );
};

export default Order;
