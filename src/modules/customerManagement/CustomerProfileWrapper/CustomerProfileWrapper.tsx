import customerDefaultAvatar from "assets/icons/customerDefault.svg";

import "./CustomerProfileWrapper.scss";

const CustomerProfileWrapper = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <div className="customer__details">
      <img src={customerDefaultAvatar} alt="default avatar" />
      <div className="customer__fields">{children}</div>
    </div>
  );
};

export default CustomerProfileWrapper;
