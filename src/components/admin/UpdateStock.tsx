import React from 'react'
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

const UpdateStock: React.FC<Props> = ({ handleCloseOutOfStockMessage, openOutOfStockMessage }: Props) => {
  return (
    <div>
        <Dialog open={openOutOfStockMessage} onClose={handleCloseOutOfStockMessage}>
        <DialogTitle>⚠️ Hemos tenido un inconveniente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ya no hay stock suficiente para algunos productos que solicitaste, haremos los cambios correspondientes en tu carrito. hemos actualizado la cantidad que puedes solicitar o si ya no hay cantidades disponibles del producto lo removeremos del carrito. Te invitamos a verificar los cambios hechos.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOutOfStockMessage}>Continuar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UpdateStock