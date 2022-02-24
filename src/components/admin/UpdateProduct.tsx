import React, { FC } from "react";
import UpdateProductForm from "../forms/UpdateProductForm";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { NewProduct } from "../../types/NewProduct";
import { AuthContext } from "../../context/AuthProvider";
import { ItemProduct } from "../../types/ItemProduct";
import StockProduct from "./StockProduct";

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
  item: ItemProduct;
}

const UpdateProduct: FC<Props> = ({ handleClose, open, item }: Props) => {

  const { userOnline } = React.useContext(AuthContext);

  const updateProductScheme = Yup.object();

  return (
    <div>
      <Dialog open={open} onClose={handleClose}  fullWidth maxWidth={"md"}>
        <DialogTitle>Aca vamos a actualizar un producto</DialogTitle>
        <DialogContent>
          <Formik<FormModel>
            initialValues={{
              name: item.name,
              description: item.description,
              color: item.color,
              price: item.price,
              brand: item.brand,
              gender: item.gender,
              picture: item.picture,
            }}
            validationSchema={updateProductScheme}
            onSubmit={(values) => {
              const formData = new FormData();
              const updateProduct: NewProduct = {
                name: values.name,
                description: values.description,
                color: values.color,
                price: values.price,
                brand: values.brand,
                gender: values.gender,
              };

              const picture = values.picture;

              if (picture !== null && picture !== undefined) {
                formData.append("picture", picture);
              }

              formData.append("picture", new Blob());
              formData.append(
                "updateProduct",
                new Blob([JSON.stringify(updateProduct)], {
                  type: "application/json",
                })
              );

              fetch(`http://localhost:7070/jdshop/products/${item.id}`, {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${userOnline[0].token}`,
                },
                body: formData,
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.message === "Producto actualizado") {
                    handleClose();
                  } else {
                    console.log("No se logro una mierda");
                  }
                });
            }}
            component={UpdateProductForm}
          ></Formik>
          <StockProduct product={item} />
        </DialogContent>
        <Button color="error" onClick={handleClose}>
          Cacelar
        </Button>
      </Dialog>
    </div>
  );
};

export default UpdateProduct;
