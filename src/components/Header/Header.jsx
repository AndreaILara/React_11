import { Link, NavLink } from 'react-router-dom';
import logo from '/assets/logo.png';
import './Header.css';

const Header = ({ pages = [] }) => {
  return (
    <header className="separation">
      <Link to="/" className="logo-wrapper">
        <img src={logo} alt="Clima" id="logo" />
      </Link>

      <nav>
        <ul>
          {pages.map(page => {
            return (
              <li key={page.name}>
                <NavLink to={page.endpoint}>{page.name}</NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
