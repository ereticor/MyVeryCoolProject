// import { SwipeableDrawer } from "@material-ui/core";
import HeaderLogo from "components/CompanyLogo";
import UserHead from "components/UserHead";

import user from "constants/user";

import "./Header.sass";

const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <HeaderLogo />
        <UserHead user={user} />
      </div>
    </header>
  );
};

export default Header;
