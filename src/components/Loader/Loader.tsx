import loader from '../../assets/loader.gif';
import './loader.css';

const Loader = () => {
  return <img className="loader" src={loader} alt="Идёт загрузка" />;
};

export default Loader;
