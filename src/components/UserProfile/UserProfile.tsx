import { Drawer, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { cln } from "helpers/cln";

import IUser from "interfaces/User";

import defaultAvatar from "assets/icons/userDefault.svg";

import "./UserProfile.scss";

const UserProfile = ({
  user,
  isOpened,
  close,
}: {
  user: IUser;
  isOpened: boolean;
  close: () => void;
}) => {
  return (
    <Drawer
      variant="temporary"
      ModalProps={{
        keepMounted: true,
      }}
      anchor={"right"}
      open={isOpened}
      onClose={close}
    >
      <div className="head__profile">
        <div className="profile__title">
          <h3>User Profile</h3>
          <IconButton aria-label="close" onClick={close}>
            <CloseIcon />
          </IconButton>
        </div>
        <figure className="profile__figure">
          <img
            src={user.avatar || defaultAvatar}
            alt="user logo"
            className={cln("user__avatar", !user.avatar && "default")}
          />
          <figcaption className="figure__cap">{user.name}</figcaption>
        </figure>
        <ul className="profile__info">
          {[user.name, user.name].map((item, index) => {
            return (
              <li key={`user: ${index}`} className="profile__field">
                <p className="field__item">{"name"}</p>
                <p className="field__value">{item}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Drawer>
  );
};

export default UserProfile;
