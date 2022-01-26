import { Button } from "@material-ui/core";

import "./FormFooter.scss";

interface IFormFooter {
  cancelValue?: unknown;
  cancelHandler?: (value: unknown) => void | Promise<void>;
  cancelBtnText?: string;
  cancelBtnClass?: "submit" | "delete" | "edit" | "cancel" | "save";
  submitValue?: unknown;
  submitHandler?: (value: unknown) => void | Promise<void>;
  submitBtnText?: string;
  submitBtnClass?: "submit" | "delete" | "edit" | "cancel" | "save";
}

const FormFooter = ({
  cancelValue,
  cancelHandler,
  cancelBtnText,
  cancelBtnClass,
  submitValue,
  submitHandler,
  submitBtnText,
  submitBtnClass,
}: IFormFooter) => {
  const CancelBtnElement = (
    <Button
      className={cancelBtnClass || "cancel"}
      onClick={() => (cancelHandler ? cancelHandler(cancelValue) : false)}
    >
      {cancelBtnText || "Cancel"}
    </Button>
  );

  const SubmitBtnElement = (
    <Button
      className={submitBtnClass || "save"}
      onClick={() => (submitHandler ? submitHandler(submitValue) : false)}
    >
      {submitBtnText || "save"}
    </Button>
  );

  return (
    <div className="form__controls">
      {cancelHandler ? CancelBtnElement : null}
      {submitHandler ? SubmitBtnElement : null}
    </div>
  );
};

export default FormFooter;
