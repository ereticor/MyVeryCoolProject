import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import "./FormControls.scss";

interface IFormControls {
  cancelValue?: unknown;
  cancelHandler?: (value: unknown) => void | Promise<void>;
  cancelBtnText?: string;
  cancelLink?: string;
  submitBtnText?: string;
  submitLink?: string;
  submitValue?: unknown;
  submitHandler?: (value: unknown) => void | Promise<void>;
}

const FormControls = ({
  cancelValue,
  cancelHandler,
  cancelBtnText,
  cancelLink,
  submitValue,
  submitHandler,
  submitBtnText,
  submitLink,
}: IFormControls) => {
  return (
    <div className="form__controls">
      <Button
        onClick={() => (cancelHandler ? cancelHandler(cancelValue) : false)}
      >
        {cancelLink ? (
          <Link to={cancelLink}>{cancelBtnText || "Cancel"}</Link>
        ) : (
          cancelBtnText || "Cancel"
        )}
      </Button>
      <Button
        onClick={() => (submitHandler ? submitHandler(submitValue) : false)}
      >
        {submitLink ? (
          <Link to={submitLink}>{submitBtnText || "Cancel"}</Link>
        ) : (
          submitBtnText || "save"
        )}
      </Button>
    </div>
  );
};

export default FormControls;
