import '../styles/components/header/header.css';
import logo from '../icons/logo.svg';

export const Header = () => {
  return (
    <header className="header">
      <div className="container headerContainer">
        <svg width="104" height="26">
          <use href={logo + '#logo-icon'} />
        </svg>
        <div>
          <button className="buttonHeader">Users</button>
          <button className="buttonHeader">Sign up</button>
        </div>
      </div>
    </header>
  );
};
