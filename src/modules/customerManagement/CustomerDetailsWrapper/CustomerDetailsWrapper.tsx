import customerDefaultAvatar from "assets/icons/customerDefault.svg";

import "./CustomerDetailsWrapper.scss";

const CustomerDetailsWrapper = ({
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

export default CustomerDetailsWrapper;
