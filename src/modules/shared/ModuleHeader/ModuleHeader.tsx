import { Link } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";

import "./ModuleHeader.scss";

interface IModuleHeader {
  title: string;
  headClass?: string;
  headNavClass?: string;
  titleClass?: string;
  backLink?: string | null;
  children?: React.ReactNode;
}

const ModuleHeader = ({
  title,
  children,
  headClass = "",
  headNavClass = "",
  titleClass = "",
  backLink = null,
}: IModuleHeader) => {
  return (
    <div className={`module__head ${headClass}`}>
      <nav className={`module__nav ${headNavClass}`}>
        {backLink ? (
          <Link to={backLink}>
            <ArrowBack />
          </Link>
        ) : null}
        <h3 className={`module__title ${titleClass}`}>{title}</h3>
      </nav>
      {children}
    </div>
  );
};

export default ModuleHeader;