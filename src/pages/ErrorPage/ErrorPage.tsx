import { Link, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";

import errors from "config/errors";

import "./ErrorPage.scss";

const ErrorPage = () => {
  const { errorCode = errors.UNEXPECTED.code } = useParams();

  let error;

  switch (+errorCode) {
    case 403: {
      error = errors.ACCESS_FORBIDDEN;
      break;
    }
    case 404: {
      error = errors.NOT_FOUND;
      break;
    }
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 505: {
      error = errors.SERVER_TROUBLE;
      break;
    }
    default: {
      error = errors.UNEXPECTED;
    }
  }

  const message = errorCode + " " + error.message;
  const errorIcon = error.image;

  return (
    <div className="error__page">
      <div className="error__container">
        <h3 className="error__head">Oops, an error occured</h3>
        <img src={errorIcon} alt="am ඞ gus" className="error__image" />
        <div className="error__details">
          <p className="error__message">{message}</p>
        </div>
        <Link to="/">
          <Button className="error__return">return to main page</Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
