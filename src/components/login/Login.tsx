import React, { SyntheticEvent, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { CartContext } from "../../context/CartProvider";

import { Link } from "react-router-dom";
// styles

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import toast, { Toaster } from "react-hot-toast";

import Typography from "@mui/material/Typography";

import { login } from "../../service/loginService";
import NavigateBar from "../header/NavigateBar";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { logIn, isAdmin, isLogged } = React.useContext(AuthContext);
  const { getCart } = React.useContext(CartContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let error = false;

  const errorDontFoundUser = () =>
    toast.error(
      "No se ha podido iniciar sesión, válida los campos nuevamente."
    );

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const user = await login(userName, password);

      if (user.token && user.userName && user.authorities) {
        await localStorage.setItem("AuthUser", JSON.stringify(user));
      }

      await logIn();

      if (isLogged() && getCart().length > 0) {
        navigate("/cart");
      } else if (isLogged() && !isAdmin()) {
        navigate("/");
      } else if (isLogged()) {
        navigate(state?.path || "/");
      } else if (user.message === "Don't found user") {
        errorDontFoundUser();
      } else {
        errorLogin();
      }
    } catch (error) {}
  };

  const errorLogin = () =>
    toast.error("No se ha podido iniciar sesión, intentalo nuevamente");

  return (
    <div className="login__image ">
      <Toaster position="top-left" />
      <NavigateBar />
      <div className="login__main" style={{ boxSizing: "content-box" }}>
        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          component="main"
          sx={{ height: "91vh", bgcolor: "" }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="login__iconCidenet"></div>

              <Typography component="h1" variant="h5">
                Bienvenido a Cidenet Shop
              </Typography>

              <Box component="form" onSubmit={submit}>
                <TextField
                  error={error}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e: any) => setUserName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e: any) => setPassword(e.target.value)}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    fontFamily: "'Rubik', sans-serif",
                    fontWeight: "lighter",
                    letterSpacing: "0.1rem",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  Entrar
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to="/register">{"Registrarse"}</Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Login;
