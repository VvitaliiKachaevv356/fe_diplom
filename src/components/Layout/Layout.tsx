import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';

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
