import React from "react";
import { FormikProps } from "formik";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

interface FormModel {
  name: string;
  description: string;
  color: string;
  price: number;
  brand: string;
  gender: string;
  picture: any;
}

const UpdateProductForm: (props: FormikProps<FormModel>) => JSX.Element = ({
  handleSubmit,
  values,
  handleChange,
  setFieldValue,
  errors,
  touched,
}) => {
  return (
    <div className="updateProductForm">
      <form onSubmit={handleSubmit}>
        <div className="updateProduct-container">
          <div className="container-left">
            <div className="addProduct__input">
              <Select
                id="gender"
                name="gender"
                value={values.gender}
                onChange={handleChange}
                style={{ width: "13rem" }}
              >
                <MenuItem value="masculino">Masculino</MenuItem>
                <MenuItem value="femenino">Femenino</MenuItem>
              </Select>
            </div>
            <div className="addProduct__input">
              {errors.name && touched.name ? (
                <div
                  style={{
                    color: "red",
                    paddingBottom: "0.3rem",
                    width: "13rem",
                  }}
                >
                  {errors.name}
                </div>
              ) : (
                <div
                  style={{
                    color: "red",
                    paddingBottom: "0.3rem",
                    height: "2.35rem",
                    width: "13rem",
                  }}
                ></div>
              )}
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
              {errors.color && touched.color ? (
                <div
                  style={{
                    color: "red",
                    paddingBottom: "0.3rem",
                    width: "13rem",
                  }}
                >
                  {errors.color}
                </div>
              ) : (
                <div
                  style={{
                    color: "red",
                    paddingBottom: "0.3rem",
                    height: "2.35rem",
                    width: "13rem",
                  }}
                ></div>
              )}
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
              {errors.brand && touched.brand ? (
                <div
                  style={{
                    color: "red",
                    paddingBottom: "0.3rem",
                    width: "13rem",
                  }}
                >
                  {errors.brand}
                </div>
              ) : (
                <div
                  style={{
                    color: "red",
                    paddingBottom: "0.3rem",
                    height: "2.35rem",
                    width: "13rem",
                  }}
                ></div>
              )}
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
              {errors.description && touched.description ? (
                <div
                  style={{
                    color: "red",
                    paddingBottom: "0.3rem",
                    width: "13rem",
                  }}
                >
                  {errors.description}
                </div>
              ) : (
                <div
                  style={{
                    color: "red",
                    paddingBottom: "0.3rem",
                    height: "1.35rem",
                    width: "13rem",
                  }}
                ></div>
              )}
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
            <div className="addProduct__input" style={{ paddingTop: "0.3rem" }}>
              {errors.price && touched.price ? (
                <div
                  style={{
                    color: "red",
                    paddingBottom: "0.3rem",
                    width: "13rem",
                    paddingTop: "1.2rem",
                  }}
                >
                  {errors.price}
                </div>
              ) : (
                <div
                  style={{
                    color: "red",
                    paddingBottom: "0.3rem",
                    height: "2.35rem",
                    width: "13rem",
                  }}
                ></div>
              )}
              <TextField
                type="text"
                id="price"
                name="price"
                value={values.price}
                onChange={handleChange}
                label="Precio"
              ></TextField>
              <div
                className="addProduct__input"
                style={{ paddingTop: "1.5rem" }}
              >
                {errors.picture && touched.picture ? (
                  <div
                    style={{
                      color: "red",
                      paddingBottom: "0.3rem",
                      width: "13rem",
                    }}
                  >
                    {errors.picture}
                  </div>
                ) : (
                  <div
                    style={{
                      color: "red",
                      paddingBottom: "0.3rem",
                      height: "0.9rem",
                      width: "13rem",
                    }}
                  ></div>
                )}
                <TextField
                  type="file"
                  id="picture"
                  name="picture"
                  onChange={(e: any) => {
                    setFieldValue("picture", e.target.files[0]);
                  }}
                >
                  {" "}
                </TextField>{" "}
                <AddPhotoAlternateIcon fontSize="large" color="primary" />
              </div>
            </div>

            <div className="addProduct-btn">
              <Button type="submit">Actualizar producto</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductForm;
