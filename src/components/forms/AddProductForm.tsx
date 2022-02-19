import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import Button from "@mui/material/Button";

import { AuthContext } from "../../context/AuthProvider";

import { Formik, FormikProps } from "formik";
import * as Yup from "yup";

import TextField from "@mui/material/TextField";

import { NewProduct } from "../../types/NewProduct";

interface FormModel {
  name: string;
  description: string;
  color: string;
  price: number;
  brand: string;
  gender: "masculino";
  picture: any;
}

interface Props {
  handleClose: () => void;
  open: boolean;
}

const AddProductForm: FC<Props> = ({ handleClose, open }: Props) => {
  const { userOnline } = React.useContext(AuthContext);

  const addProductSchema = Yup.object().shape({
    name: Yup.string().required("Se require nombre para el producto"),
    description: Yup.string().required("Se requiere una descripción"),
    color: Yup.string().required("Se requiere rellenar los colores"),
    price: Yup.string().required("se requiere un precion"),
    brand: Yup.string().required("se requiere que se especifique la marca"),
    picture: Yup.string().required("Se necesita una imagen"),
  });
  return (
    <div className="addProduct-container">
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
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
              console.log(formData.get("picture"));
              console.log(formData.get("newProduct"));

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
                    console.log("Se logro con exito");
                  } else {
                    console.log("No se logro una mierda");
                  }
                });
            }}
            component={AddProduct}
          ></Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProductForm;

let AddProduct: (props: FormikProps<FormModel>) => JSX.Element = ({
  handleSubmit,
  values,
  handleChange,
  setFieldValue,
  errors,
  touched,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="addProduct-container">
        <div className="container-left">
          <div className="addProduct__input">
            <Select
              id="gender"
              name="gender"
              value={values.gender}
              label="Genero"
              onChange={handleChange}
              style={{ paddingRight: "5.5rem" }}
            >
              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="femenino">Femenino</MenuItem>
            </Select>
          </div>
          <div className="addProduct__input">
            {errors.name && touched.name}
            <TextField
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              label="Nombre"
            ></TextField>
          </div>
          <div className="addProduct__input">
            <TextField
              type="text"
              id="color"
              name="color"
              value={values.color}
              onChange={handleChange}
              label="Colores"
            ></TextField>
          </div>

          <div className="addProduct__input">
            <TextField
              type="text"
              id="brand"
              name="brand"
              value={values.brand}
              onChange={handleChange}
              label="Marca"
            ></TextField>
          </div>
        </div>

        <div className="container-right">
          <div className="addProduct__input">
            <TextField
              type="text"
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              label="Descripcion"
              style={{ paddingBottom: "0.2rem" }}
              multiline
              rows={5}
            ></TextField>
          </div>
          <div className="addProduct__input">
            <TextField
              type="text"
              id="price"
              name="price"
              value={values.price}
              onChange={handleChange}
              label="Precio"
            ></TextField>
          </div>
          <div className="addProduct__input">
            <TextField
              type="file"
              id="picture"
              name="picture"
              onChange={(e: any) => {
                setFieldValue("picture", e.target.files[0]);
              }}
            ></TextField>
          </div>
          <div className="addProduct-btn">
            <Button>Cancelar</Button>
            <Button type="submit">Agregar producto</Button>
          </div>
        </div>
      </div>
    </form>
  );
};
