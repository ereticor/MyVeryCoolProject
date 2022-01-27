import { IconButton, Tooltip } from "@material-ui/core";

import CONFIG from "config/table/actions";

import { cln } from "helpers/cln";

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
                className={cln("action", !isRowActionsShown && "action_hidden")}
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
