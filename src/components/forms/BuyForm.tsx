import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface Props {
  handleClose: () => void;
  open: boolean;
  onChangeDepartamento: (n: string) => void;
  onChangeCity: (n: string) => void;
  onChangeAddress: (n: string) => void;
  handleCreateOrder: () => void;
}

const Formulario: React.FC<Props> = ({
  handleClose,
  open,
  onChangeCity,
  onChangeDepartamento,
  onChangeAddress,
  handleCreateOrder,
}: Props) => {
  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeAddress(e.target.value);
  };
  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeCity(e.target.value);
  };
  const handleChangeDepartamento = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeDepartamento(e.target.value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>✔️  Un poco más de información</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nos alegramos que te hayan gustado nuestros productos, estamos cerca
            de finalizar!
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Departamento"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeDepartamento}
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Ciudad"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeCity}
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Dirección de entrega"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangeAddress}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleCreateOrder}>Finalizar pedido</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Formulario;
