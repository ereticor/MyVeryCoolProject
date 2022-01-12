import { CircularProgress } from "@material-ui/core";

import "./ProgressSpinner.scss";

const ProgressSpinner = ({ isLoading = false }: { isLoading: boolean }) => {
  return isLoading ? (
    <div className={`progress__shadow ${isLoading ? "shadow_active" : ""}`}>
      <CircularProgress className="progress__spinner" />
    </div>
  ) : null;
};

export default ProgressSpinner;
