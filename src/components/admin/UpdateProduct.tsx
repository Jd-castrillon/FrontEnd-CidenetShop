import React, { FC } from "react";
import UpdateProductForm from "../forms/UpdateProductForm";
import EditIcon from "@mui/icons-material/Edit";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { NewProduct } from "../../types/NewProduct";
import { AuthContext } from "../../context/AuthProvider";

import { ItemAdminProduct } from "../../types/ItemAdminProduct";
import StockProduct from "./StockProduct";
import toast, { Toaster } from "react-hot-toast";

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
  item: ItemAdminProduct;
}

const UpdateProduct: FC<Props> = ({ handleClose, open, item }: Props) => {
  const { getToken } = React.useContext(AuthContext);

  const digitsOnly = (value: any) => /^\d+$/.test(value);

  const updateProductScheme = Yup.object().shape({
    name: Yup.string()
      .required("Se require nombre para el producto")
      .min(5, "Nombre demasiado corto")
      .max(30, "Nombre demasiado largo"),
    description: Yup.string()
      .required("Se requiere una descripción")
      .min(10, "Descripción demasiada corta.")
      .max(120, "Descripción demasiada larga."),
    color: Yup.string()
      .required("Se requiere rellenar los colores")
      .min(5, "Color demasiado corto.")
      .max(30, "Color demasiado largo."),
    price: Yup.number()
      .typeError("Se espera un número")
      .required("Se requiere un precio")
      .test("Digits only", "El campo solo debe tener números.", digitsOnly)
      .test(
        "greaterThan0",
        "Valor inválido",
        (value) => value !== undefined && value > 0
      ),
    brand: Yup.string()
      .required("Se requiere que se especifique la marca")
      .min(3, "Marca demasiada corta")
      .max(30, "Marca demasiada larga"),
    picture: Yup.mixed().test(
      "fileType",
      "Archivo no soportado",
      (value) =>
        value === undefined ||
        ["image/jpg", "image/jpeg", null, undefined].includes(value.type)
    ),
  });

  const error = () => toast.error("Algo ha salido mal.");
  const sucess = () => toast.success("El producto ya ha sido actualizado.");

  return (
    <div>
      <Toaster />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EditIcon style={{ padding: "0.5rem" }}></EditIcon>{" "}
          <b>Editar producto</b>
        </DialogTitle>
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
                  Authorization: getToken(),
                },
                body: formData,
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.message === "Product was update") {
                    sucess();
                  } else {
                    error();
                  }
                });
            }}
            component={UpdateProductForm}
          ></Formik>
          <StockProduct product={item} />
        </DialogContent>
        <Button
          color="error"
          style={{
            fontFamily: "'Rubik', sans-serif",
            fontWeight: "lighter",
            letterSpacing: "0.1rem",
          }}
          onClick={handleClose}
        >
          Cacelar
        </Button>
      </Dialog>
    </div>
  );
};

export default UpdateProduct;
