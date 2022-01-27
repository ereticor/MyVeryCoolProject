import {
  AttachFile,
  Cancel,
  CloudUploadOutlined,
  Delete,
  Edit,
  LibraryAdd,
} from "@material-ui/icons";

import tableActions from "constants/tableActions";

export default {
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
