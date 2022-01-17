import logo from "assets/icons/appLogo.png";
import { Link } from "react-router-dom";

const AppLogo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="company logo" />
    </Link>
  );
};

export default AppLogo;
