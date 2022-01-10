import AppLogo from "components/AppLogo";
import UserHead from "components/UserHead";

import user from "constants/user";

import "./AppHeader.scss";

const AppHeader = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <AppLogo />
        <UserHead user={user} />
      </div>
    </header>
  );
};

export default AppHeader;
