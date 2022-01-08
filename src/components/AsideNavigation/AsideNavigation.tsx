import { Button } from "@material-ui/core";

import { StyledAside } from "./style";
import { IAppList } from "interfaces/app";
import { NavLink } from "react-router-dom";

import "./AsideNavigation.sass";

const AsideNavigation = ({ appList }: { appList: IAppList }) => {
  return (
    <StyledAside
      variant="permanent"
      ModalProps={{
        keepMounted: true,
      }}
      anchor={"left"}
      open={true}
      hideBackdrop={true}
      className="main__aside"
    >
      <nav className="aside__nav">
        <NavLink
          end
          to="/"
          key={`aside: ${-1}`}
          className={({ isActive }) =>
            `aside__link ${isActive ? "link_active" : ""}`
          }
        >
          <Button className="aside__btn">all applications</Button>
        </NavLink>
        {appList.map((app, index) => {
          return (
            <NavLink
              end
              to={`/${app.name}`}
              key={`aside: ${index}`}
              className={({ isActive }) =>
                `aside__link ${isActive ? "link_active" : ""}`
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
