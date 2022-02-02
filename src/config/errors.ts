import notFoundImg from "assets/icons/errorPage/notfound.png";
import accessForbiddenImg from "assets/icons/errorPage/accessforbidden.gif";
import serverTroubleImg from "assets/icons/errorPage/serverTrouble.png";
import unexpectedImg from "assets/icons/errorPage/unexpected.gif";

export default {
  UNEXPECTED: { code: 418, message: "unexpected error", image: unexpectedImg },
  NOT_FOUND: { code: 404, message: "not found", image: notFoundImg },
  ACCESS_FORBIDDEN: {
    code: 403,
    message: "access forbidden",
    image: accessForbiddenImg,
  },
  SERVER_TROUBLE: {
    code: 500,
    message: "server troubles",
    image: serverTroubleImg,
  },
};
