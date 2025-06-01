import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Confirmation from "./pages/Confirmation/Confirmation";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import Order from "./pages/Order/Order";
import Passengers from "./pages/Passengers/Passengers";
import Payment from "./pages/Payment/Payment";
import Seats from "./pages/Seats/Seats";
import Trains from "./pages/Trains/Trains";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="order" element={<Order />} />
        <Route path="passengers" element={<Passengers />} />
        <Route path="payment" element={<Payment />} />
        <Route path="trains" element={<Trains />} />
        <Route path="seats" element={<Seats />} />
      </Route>
    ),
    { basename: import.meta.env.BASE_URL }
  );

  return <RouterProvider router={router} />;
};

export default App;
