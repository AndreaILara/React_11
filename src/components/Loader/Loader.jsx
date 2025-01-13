import './Loader.css';
import loader from '/assets/loading.gif';
const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="Gif sol y nubes" />
    </div>
  );
};

export default Loader;
