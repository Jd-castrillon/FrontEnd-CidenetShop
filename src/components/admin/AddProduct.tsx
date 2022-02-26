import React, { FC, useState } from "react";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import Button from "@mui/material/Button";

import { AuthContext } from "../../context/AuthProvider";

import { Formik } from "formik";
import * as Yup from "yup";
import { NewProduct } from "../../types/NewProduct";

import AddProductForm from "../forms/AddProductForm";

import toast, { Toaster } from "react-hot-toast";

import Spinner from "../spinner/Spinner";

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

  const [showSpinner, setShowSpinner] = useState(false);

  const digitsOnly = (value: any) => /^\d+$/.test(value);

  const addProductSchema = Yup.object().shape({
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
    picture: Yup.mixed()
      .required("Se necesita una imagen")
      .test(
        "fileType",
        "Archivo no soportado",
        (value) =>
          value === undefined ||
          ["image/jpg", "image/jpeg", null, undefined].includes(value.type)
      ),
  });

  const error = () => toast.error("Algo ha salido mal");
  const AlreadyExists = (name: string) =>
    toast.error(`El producto ${name} ya existe.`);
  const success = (name: string) =>
    toast.success(`Se ha creado el producto ${name}`);

  return (
    <div className="addProduct-container">
      <Toaster />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"sm"}>
        <DialogTitle style={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <b> Agregar Producto</b>
        </DialogTitle>
        <DialogContent>
          {showSpinner ? (
            <div
              style={{
                height: "29rem",
                width: "25rem",
                display: "flex",
                justifyContent: "space-around",
                alignItems:"center" 
              }}
            >
              <Spinner />
            </div>
          ) : (
            <div>
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
                      if (data.message === "Product was created") {
                        success(values.name);
                        setShowSpinner(true);
                        setTimeout(() => {
                          setShowSpinner(false);
                          handleClose();
                        }, 1000);
                      } else if (data.message === "Product already exists") {
                        AlreadyExists(values.name);
                      } else {
                        error();
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
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProduct;
