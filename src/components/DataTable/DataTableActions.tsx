import { IconButton, Tooltip } from "@material-ui/core";
import {
  AttachFile,
  Cancel,
  CloudUploadOutlined,
  Delete,
  Edit,
  LibraryAdd,
} from "@material-ui/icons";

import tableActions from "constants/tableActions";

const CONFIG = {
  [tableActions.edit]: {
    get title() {
      return tableActions.edit;
    },
    icon: <Edit color="primary" />,
  },
  [tableActions.delete]: {
    get title() {
      return tableActions.delete;
    },
    icon: <Delete color="secondary" />,
  },
  [tableActions.reject]: {
    get title() {
      return tableActions.reject;
    },
    icon: <Cancel color="secondary" />,
  },
  [tableActions.upload]: {
    get title() {
      return tableActions.upload;
    },
    icon: <CloudUploadOutlined color="primary" />,
  },
  [tableActions.download]: {
    get title() {
      return tableActions.download;
    },
    icon: <AttachFile color="primary" />,
  },
  [tableActions.copy]: {
    get title() {
      return tableActions.copy;
    },
    icon: <LibraryAdd color="primary" />,
  },
};

export interface IDataTableActions {
  actions: {
    type: keyof typeof CONFIG;
    handler: () => void;
  }[];
  isRowActionsShown?: boolean;
}

const DataTableActions = ({
  actions,
  isRowActionsShown = false,
}: IDataTableActions) => {
  const handleClick = (
    e: MouseEvent,
    action: IDataTableActions["actions"][0]
  ) => {
    e.stopPropagation();

    action.handler();
  };

  return (
    <>
      {actions.map((action, index) => {
        const config = CONFIG[action.type];

        return (
          <td
            key={`row action: ${action.type} ${index}`}
            className="MuiTableCell-root MuiTableCell-body"
          >
            <Tooltip title={config.title}>
              <IconButton
                onClick={
                  isRowActionsShown
                    ? (e) => handleClick(e as unknown as MouseEvent, action)
                    : undefined
                }
                className={`${
                  isRowActionsShown ? "action_visible" : "action_hidden"
                }`}
              >
                {config.icon}
              </IconButton>
            </Tooltip>
          </td>
        );
      })}
    </>
  );
};

export default DataTableActions;
