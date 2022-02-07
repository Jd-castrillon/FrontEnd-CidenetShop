import React, { SyntheticEvent, useState } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { CartContext } from "../../context/CartProvider";

import { Link } from "react-router-dom";
// styles
import { Alert } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";

import { login } from "../../service/loginService";

const Login = () => {
  const navigate = useNavigate();

  const { userOnline, addUserOnline } = React.useContext(AuthContext);
  const { cartItem } = React.useContext(CartContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);

  let error = false;

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const user = await login(userName, password);
      addUserOnline(user);

      console.log(userOnline[0].token);

      // window.localStorage.setItem("user", getUserByEmail);
      // window.localStorage.setItem("token", user.token);
      // window.localStorage.setItem(
      //   "authorities",
      //   user.authorities.map((e: { authority: any }) => {
      //     console.log(e.authority);
      //     return e.authority;
      //   })
      // );
      console.log(userOnline);
      if (cartItem.length > 0) {
        navigate("/cart");
      } else if (userOnline.length > 0) {
        navigate("/");
      } else {
        setMessage(true);
      }
    } catch (error) {
      console.log(error);
      console.log("Ha ocurrido un error");
    }
  };

  return (
    <div className="login__image">
      <div className="login__main">
        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          component="main"
          sx={{ height: "100vh", bgcolor: "" }}
        >
          <CssBaseline />

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
              {message ? (
                <Alert severity="error">
                  Ha ocurrido un error, intentalo nuevamente!
                </Alert>
              ) : (
                <Typography component="h1" variant="h5">
                  Bienvenido a Cidenet Shop
                </Typography>
              )}

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
