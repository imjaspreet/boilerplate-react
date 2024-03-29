import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Controls from "../../controls/Controls";

const ConfirmationPopup = (props) => {
  const { open, onConfirm, onClose, title, message } = props;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        variant="subtitle1"
        component="span"
        fontWeight={500}
        style={{ flexGrow: 1 }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Controls.Button onClick={onClose} color="inherit">
          Cancel
        </Controls.Button>
        <Controls.Button onClick={handleConfirm} color="primary">
          Confirm
        </Controls.Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationPopup;
