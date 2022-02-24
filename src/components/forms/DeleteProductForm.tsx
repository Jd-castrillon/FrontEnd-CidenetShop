import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ItemProduct } from "../../types/ItemProduct";
import Button from "@mui/material/Button";
import { DeleteProduct } from "../../service/DeleteProduct";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

interface Props {
  handleClose: () => void;
  open: boolean;
  item: ItemProduct;
}

const DeleteProductsForm: FC<Props> = ({ handleClose, open, item }: Props) => {
  let urlImage: string = `data:image/JPG;base64,${item.picture}`;
  const navigate = useNavigate();

  const { userOnline } = React.useContext(AuthContext);

  const deleteProduct = async () => {
    const response = await DeleteProduct(item, userOnline[0].token);
    if (response.message === "Producto eliminado") {
      navigate("/admin");
      handleClose();
      console.log(`Se elimino el producto ${item.name} ${item.id}`);
    } else {
      console.log("El producto no se elimino");
    }
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Eliminar producto</DialogTitle>
        <DialogContent>
          Estas seguro que quieres eliminar el producto:
          <div>
            <img src={urlImage} alt="" />
          </div>
          <div className="">
            <p>{item.name}</p>
          </div>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={deleteProduct}  color="error">Eliminar</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteProductsForm;
