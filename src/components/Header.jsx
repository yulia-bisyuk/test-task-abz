import '../styles/components/header/header.css';
import logo from '../icons/logo.svg';

export const Header = () => {
  return (
    <header className="header">
      <div className="container headerContainer">
        <svg width="104" height="26">
          <use href={logo + '#logo-icon'} />
        </svg>
        <div className="headerLinksWrapper">
          <a href="#users" className="headerAnchorLink">
            <button className="buttonHeader" type="button">
              Users
            </button>
          </a>
          <a href="#signUp">
            <button className="buttonHeader" type="button">
              Sign up
            </button>
          </a>
        </div>
      </div>
    </header>
  );
};
