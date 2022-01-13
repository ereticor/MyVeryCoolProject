import { Link } from "react-router-dom";

import errorImg from "assets/icons/error.gif";

import "./ErrorPage.scss";
import { Button } from "@material-ui/core";

import reqErrors from "constants/reqErrors";

const ErrorPage = ({ message }: { message: string }) => {
  return (
    <div className="error__page">
      <div className="error__container">
        <img src={errorImg} alt="am ඞ gus" className="error__image" />
        <div className="error__details">
          <h3 className="error__message">Oops, an error occured:</h3>
          <p className="error__reason">
            {(message in reqErrors
              ? message
              : "#" + reqErrors.UNEXPECTED + message.slice(1)
            )
              .slice(1)
              .replaceAll("_", " ")}
          </p>
        </div>
        <Link to="/">
          <Button className="error__return">return to main page</Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
