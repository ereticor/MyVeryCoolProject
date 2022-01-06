import { Button } from "@material-ui/core";

import { StyledAside } from "./style";
import { IAppList } from "interfaces/app";
import { Link } from "react-router-dom";

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
        <Link to="/" key={`aside: ${-1}`} className="aside__link">
          <Button className="aside__btn">all applications</Button>
        </Link>
        {appList.map((app, index) => {
          return (
            <Link
              to={`/${app.name}`}
              key={`aside: ${index}`}
              className="aside__link"
            >
              <Button className="aside__btn">{app.name}</Button>
            </Link>
          );
        })}
      </nav>
    </StyledAside>
  );
};

export default AsideNavigation;
