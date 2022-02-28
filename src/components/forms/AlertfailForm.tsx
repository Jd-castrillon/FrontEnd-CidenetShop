import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  openAlert: boolean;
  handleCloseAlert: () => void;
  message:string
}

const AlertFailForm = ({ openAlert, handleCloseAlert , message}: Props) => {
  
  
  

  return (
    <div>
      
      <Dialog
        open={openAlert}
        keepMounted
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Alert to continue shopping
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color="primary" style={{ fontFamily:"'Rubik', sans-serif",fontWeight:"lighter", letterSpacing:"0.1rem" }}> 
            continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertFailForm;
