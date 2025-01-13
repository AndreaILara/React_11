import { socialsArray } from '../../data/footerLinks';
import Socials from '../Socials/Socials';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="separation">
      <menu>
        <Socials socialsArray={socialsArray} />
      </menu>
    </footer>
  );
};

export default Footer;
