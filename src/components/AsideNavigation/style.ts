import { Drawer } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

export const StyledAside = styled(Drawer)({
  "& > .MuiDrawer-paper": {
    top: "80px",
    width: "18%",
    minWidth: "150px",
    borderTopRightRadius: "10px",
  },
});
