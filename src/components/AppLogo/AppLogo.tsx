import logo from "assets/icons/appLogo.png";
import { Link } from "react-router-dom";

import "./AppLogo.scss";

const AppLogo = () => {
  return (
    <Link to="/" className="logo__wrapper">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span>
        <img src={logo} alt="company logo" />
      </span>
    </Link>
  );
};

export default AppLogo;
