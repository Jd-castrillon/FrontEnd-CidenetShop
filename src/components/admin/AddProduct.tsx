import React, { FC } from "react";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import Button from "@mui/material/Button";

import { AuthContext } from "../../context/AuthProvider";

import { Formik } from "formik";
import * as Yup from "yup";
import { NewProduct } from "../../types/NewProduct";

import AddProductForm from "../forms/AddProductForm";

interface FormModel {
  name: string;
  description: string;
  color: string;
  price: number;
  brand: string;
  gender: string;
  picture: any;
}

interface Props {
  handleClose: () => void;
  open: boolean;
}

const AddProduct: FC<Props> = ({ handleClose, open }: Props) => {
  const { userOnline } = React.useContext(AuthContext);

  const addProductSchema = Yup.object().shape({
    name: Yup.string().required("Se require nombre para el producto"),
    description: Yup.string().required("Se requiere una descripción"),
    color: Yup.string().required("Se requiere rellenar los colores"),
    price: Yup.string().required("se requiere un precio"),
    brand: Yup.string().required("se requiere que se especifique la marca"),
    picture: Yup.string().required("Se necesita una imagen"),
  });
  return (
    <div className="addProduct-container">
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"sm"}>
        <DialogTitle>Agregar Producto</DialogTitle>
        <DialogContent>
          <Formik<FormModel>
            initialValues={{
              name: "",
              description: "",
              color: "",
              price: 0,
              brand: "",
              gender: "masculino",
              picture: "",
            }}
            validationSchema={addProductSchema}
            onSubmit={(values) => {
              const formData = new FormData();
              const newProduct: NewProduct = {
                name: values.name,
                description: values.description,
                color: values.color,
                price: values.price,
                brand: values.brand,
                gender: values.gender,
              };

              const picture = values.picture;

              formData.append("picture", picture);
              formData.append(
                "newProduct",
                new Blob([JSON.stringify(newProduct)], {
                  type: "application/json",
                })
              );

              fetch("http://localhost:7070/jdshop/products", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${userOnline[0].token}`,
                },
                body: formData,
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.message === "Producto guardado") {
                    handleClose();
                  } else {
                    console.log("No se logro una mierda");
                  }
                });
            }}
            component={AddProductForm}
          ></Formik>
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "end",
            }}
          >
            <Button onClick={handleClose} color="error">
              Cancelar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProduct;
