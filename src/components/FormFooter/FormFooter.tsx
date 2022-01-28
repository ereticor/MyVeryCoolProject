import { Button } from "@material-ui/core";

import "./FormFooter.scss";

interface IFormButton {
  text?: string;
  className?: "submit" | "delete" | "edit" | "cancel" | "save";
  handler: () => void | Promise<void>;
}

interface IFormFooter {
  buttons: IFormButton[];
}

const FormFooter = ({ buttons }: IFormFooter) => {
  return (
    <div className="form__controls">
      {buttons.map(({ text, className, handler }, index) => {
        return (
          <Button
            key={`form button: ${index}`}
            className={className || "save"}
            onClick={() => handler()}
          >
            {text || "button"}
          </Button>
        );
      })}
    </div>
  );
};

export default FormFooter;
