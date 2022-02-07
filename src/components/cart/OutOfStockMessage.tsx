import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

interface Props {
  handleCloseOutOfStockMessage: () => void;
  openOutOfStockMessage: boolean;
}

const OutOfStockMessage: React.FC<Props> = ({ handleCloseOutOfStockMessage, openOutOfStockMessage }: Props) => {
  return (
    <div>
      <Dialog open={openOutOfStockMessage} onClose={handleCloseOutOfStockMessage}>
        <DialogTitle>⚠️ Hemos un inconveniente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hemos tenido incovenientes con el stock, hemos hecho los cambios correspondientes en tu carrito. Te invitamos a verificarlo
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOutOfStockMessage}>Continuar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OutOfStockMessage;
