import { useState } from "react";

import UserProfile from "components/UserProfile";

import IUser from "interfaces/User";

import defaultAvatar from "assets/icons/userDefault.svg";

import "./UserHead.sass";

const UserHead = ({ user }: { user: IUser }) => {
  const [isShowedModal, setIsShowModal] = useState(false);

  const toggleModal = () => {
    setIsShowModal((prevState) => !prevState);
  };

  return (
    <>
      <div className="user__profile" onClick={toggleModal}>
        <img
          src={user.avatar || defaultAvatar}
          alt="user logo"
          className={`user__avatar ${user.avatar ? "" : "default"}`}
        />
        <div className="user__info">
          <p className="user__name">{user.name}</p>
          <p className="user__role">{user.role}</p>
        </div>
      </div>
      <UserProfile user={user} isOpened={isShowedModal} close={toggleModal} />
    </>
  );
};

export default UserHead;
