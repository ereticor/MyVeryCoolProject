import AppLogo from "components/AppLogo";
import UserHead from "components/UserHead";

import user from "constants/user";

import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <AppLogo />
        <UserHead user={user} />
      </div>
    </header>
  );
};

export default Header;
