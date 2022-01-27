import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";

import { cln } from "helpers/cln";

import { IAppList } from "interfaces/app";

import { StyledAside } from "./style";
import "./AsideNavigation.scss";

const AsideNavigation = ({ appList }: { appList: IAppList }) => {
  return (
    <StyledAside
      variant="permanent"
      ModalProps={{
        keepMounted: true,
      }}
      anchor={"left"}
      open={true}
      className="main__aside"
    >
      <nav className="aside__nav">
        <NavLink
          end
          to="/"
          key={`aside: ${-1}`}
          className={({ isActive }) =>
            cln("aside__link", isActive && "link_active")
          }
        >
          <Button className="aside__btn">all applications</Button>
        </NavLink>
        {appList.map((app, index) => {
          return (
            <NavLink
              to={`/${app.pathName}`}
              key={`aside: ${index}`}
              className={({ isActive }) =>
                cln("aside__link", isActive && "link_active")
              }
            >
              <Button className="aside__btn">{app.name}</Button>
            </NavLink>
          );
        })}
      </nav>
    </StyledAside>
  );
};

export default AsideNavigation;
