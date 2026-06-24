import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

export const ActionDropdown = ({ open, anchorEl, onClose, items }) => {
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      onClose();
    } else if (event.key === "Escape") {
      onClose();
    }
  }

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      role={undefined}
      placement="bottom-end"
      transition
      disablePortal
      style={{ zIndex: 50 }}>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom-end" ? "right top" : "right bottom",
          }}>
          <Paper style={{ marginTop: "4px", minWidth: "180px" }}>
            <ClickAwayListener onClickAway={onClose}>
              <MenuList
                autoFocusItem={open}
                id="composition-menu"
                onKeyDown={handleListKeyDown}>
                {items.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.onClick) item.onClick(e);
                      onClose();
                    }}
                    sx={{
                      fontSize: "14px",
                      "&:hover": {
                        backgroundColor: "#3CAFAA", // Your custom #3CAFAA color token tint
                        color: "#FFF",
                      },
                    }}>
                    {item.label}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default ActionDropdown;
