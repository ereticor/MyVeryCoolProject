import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import "./FormControls.scss";

interface IFormControls {
  cancelValue?: unknown;
  cancelHandler?: (value: unknown) => void | Promise<void>;
  cancelBtnText?: string;
  cancelBtnClass?: "submit" | "delete" | "edit" | "cancel" | "save";
  cancelLink?: string;
  submitValue?: unknown;
  submitHandler?: (value: unknown) => void | Promise<void>;
  submitBtnText?: string;
  submitBtnClass?: "submit" | "delete" | "edit" | "cancel" | "save";
  submitLink?: string;
}

const FormControls = ({
  cancelValue,
  cancelHandler,
  cancelBtnText,
  cancelBtnClass,
  cancelLink,
  submitValue,
  submitHandler,
  submitBtnText,
  submitBtnClass,
  submitLink,
}: IFormControls) => {
  return (
    <div className="form__controls">
      <Button
        className={cancelBtnClass || "cancel"}
        onClick={() => (cancelHandler ? cancelHandler(cancelValue) : false)}
      >
        {cancelLink ? (
          <Link to={cancelLink}>{cancelBtnText || "Cancel"}</Link>
        ) : (
          cancelBtnText || "Cancel"
        )}
      </Button>
      <Button
        className={submitBtnClass || "save"}
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
