import React, { FC, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { ItemAdminProduct } from "../../types/ItemAdminProduct";
import Button from "@mui/material/Button";
import { DeleteProduct } from "../../service/DeleteProduct";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../spinner/Spinner";

interface Props {
  handleClose: () => void;
  open: boolean;
  item: ItemAdminProduct;
}

const DeleteProductsForm: FC<Props> = ({ handleClose, open, item }: Props) => {
  let urlImage: string = `data:image/JPG;base64,${item.picture}`;
  const navigate = useNavigate();

  const { getToken } = React.useContext(AuthContext);
  const [showSpinner, setShowSpinner] = useState(false);
  const notify = () => toast.error("El producto todavía tiene stock.");
  const error = () => toast.error("Algo ha salido mal");
  const success = (name: string) =>
    toast.success(`Se ha eliminado el producto ${name}`);

  const deleteProduct = async () => {
    const response = await DeleteProduct(item, getToken());
    if (response.message === "Product was delete") {
      navigate("/admin");
      success(item.name);
      setShowSpinner(true);
      setTimeout(() => {
        setShowSpinner(false);
        handleClose();
      }, 1000);
      
    } else if (response.message === "Don't delete product with stock") {
      notify();
    } else {
      error();
    }
  };

  return (
    <div>
      <Toaster />
      <Dialog onClose={handleClose} open={open}>
        <>
        <div style={{display:"flex", justifyContent:"center"}}>
          <DialogTitle><b>Eliminar producto</b></DialogTitle>

        </div>
          <DialogContent >
            {showSpinner ? (
              <div style={{height:"22.5rem", width:"20.5rem"}}>
                <Spinner />
              </div>
            ) : (
              <div  style={{display:"flex", justifyContent:"center" , alignItems:"center", flexDirection:"column"}} >
                Estas seguro que quieres eliminar el producto:
                <div style={{paddingTop:"1rem"}}>
                  <img src={urlImage} alt="" style={{height:"15rem", width:"13rem" , borderRadius:"10px"}} />
                </div>
                <div className="">
                  <p><b>{item.name}</b></p>
                </div >
                <div style={{display:"flex"}}>
                
                <Button onClick={handleClose} style={{ fontFamily:"'Rubik', sans-serif",fontWeight:"lighter", letterSpacing:"0.1rem" }}>Cancelar</Button>
                <Button variant="contained" onClick={deleteProduct} color="error" style={{marginLeft:"0.5rem" , background:"#ff2929", color:"white", fontFamily:"'Rubik', sans-serif",fontWeight:"lighter", letterSpacing:"0.1rem" }}>
                  Eliminar
                </Button>
                </div>
                
              </div>
            )}
          </DialogContent>
        </>
      </Dialog>
    </div>
  );
};

export default DeleteProductsForm;
