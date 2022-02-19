import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Formik, FormikProps } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

import { Alert } from "@mui/material";
import { Grid } from "@mui/material";

import { MenuItem } from "@mui/material";


import * as Yup from "yup";
import NavigateBar from "../header/NavigateBar";

interface FormModel {
  documentType: string;
  documentNumber: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface newUser {
  documentType: string;
  documentNumber: string;
  name: string;
  email: string;
  password: string;
}

const Resgister = () => {
  const [message, setMessage] = useState(false);
  
  const digitsOnly = (value:any) => /^\d+$/.test(value)

  const RegisterSchema = Yup.object().shape({
    documentNumber: Yup.string()
    .test('Digits only', 'Solo digitar números', digitsOnly)
      .min(5, "demasiado corto")
      .required("requiere documento"),
    name: Yup.string().required("El nombre es requerido"),
    email: Yup.string()
      .email("Direccion de correo inválida")
      .required("El email es requerido"),
    password: Yup.string()
      .min(5, "contraseña demasiado corta")
      .max(15, "contraseña demasiado larga")
      .required("Se necesita contraseña entre 5 y 15 caracteres"),
    confirmPassword: Yup.string()
      .required("Digita nuevamente la contraseña")
      .oneOf([Yup.ref("password"), null], "las contraseñas no coinciden"),
  });

  const navigate = useNavigate();

  return (
    <div className="register_wrapper">
      <NavigateBar />
      {message ? (
        <Alert severity="error">Ha ocurrido un error, intentalo nuevamente!</Alert>
      ) : null}
      <Formik<FormModel>
        initialValues={{
          documentType: "cedula de ciudadania",
          documentNumber: "",
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          setTimeout(() => {
            console.log(JSON.stringify(values));
            let user: newUser = {
              documentType: values.documentType,
              documentNumber: values.documentNumber,
              name: values.name,
              email: values.email,
              password: values.password,
            };
            console.log(user);
            fetch("http://localhost:7070/jdshop/auth/newuser", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(user),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.message === "usuario guardado") {
                  navigate("/login");
                } else {
                  setMessage(true);
                }
              });
          }, 2000);
        }}
        component={RegistrationForm}
        
      />
    </div>
  );
};

let RegistrationForm: (props: FormikProps<FormModel> ) => JSX.Element = ({
  handleSubmit,
  values,
  handleChange,
  errors,
  touched,
 
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-ai-e register__cualquiercosa">
        <div className="register__form">
          <div className="register__iconCidenet"></div>
          
          <div className="flex   register__main">
            {/* primera columna */}
            <div className="register__column">
              <div className="register__input">
                <Select
                  id="documentType"
                  name="documentType"
                  value={values.documentType}
                  
                  onChange={handleChange}
                >
                  <MenuItem value="cedula de ciudadania">
                    Cedula de ciudadania
                  </MenuItem>
                  <MenuItem value="tarjeta de identidad">
                    Tarjeta de identidad
                  </MenuItem>
                </Select>
              </div>
              <div className="register__input">
                {errors.name &&  touched.name ? (
                  <div style={{ color: "red", paddingBottom:"0.3rem" }}>{errors.name}</div>
                ) : null}
                <TextField
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  label="Nombre"
                />
              </div>
              <div className="register__input">
                {errors.password && touched.password ? (
                  <div style={{ color: "red" }}> {errors.password}</div>
                ) : null}
                <TextField
                  margin="normal"
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* segunda columna */}
            <div className="register__column">
              <div className="register__input">
                {errors.documentNumber && touched.documentNumber ? (
                  <div style={{ color: "red" }}>{errors.documentNumber}</div>
                ) : null}
                <TextField
                  type="text"
                  id="documentNumber"
                  name="documentNumber"
                  value={values.documentNumber}
                  onChange={handleChange}
                  label="Número de documento"
                />
              </div>

              <div className="register__input">
                {errors.email && touched.email ? (
                  <div style={{ color: "red" }}> {errors.email} </div>
                ) : null}
                <TextField
                  type="email"
                  id="email"
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div className="register__input">
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div style={{ color: "red" }}>{errors.confirmPassword}</div>
                ) : null}
                <TextField
                  margin="normal"
                  name="confirmPassword"
                  label="Confirmar contraseña"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="register__button flex flex-jc-sb flex-ai-c">
            <div>
              <Grid item>
                <Link to="/login">{"Iniciar sesion"}</Link>
              </Grid>
            </div>
            <div>
              <Button
                style={{ marginLeft: "1rem" }}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrarse
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Resgister;
