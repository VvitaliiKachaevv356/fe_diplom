import { Outlet } from 'react-router-dom';
import Footer from '../sections/Footer/Footer';
import Modal from '../UI/other/Modal/Modal';

const Layout = () => {
  return (
    <>
      <Outlet />
      <Footer />
      <Modal />
    </>
  );
};

export default Layout;
