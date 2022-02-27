import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import { AuthContext } from "../../context/AuthProvider";
import Badge from "@material-ui/core/Badge";
import { CartContext } from "../../context/CartProvider";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const NavigateBar = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  useEffect(() => {}, []);

  const logOutFunction = () => {
    logOut();
    navigate("/");
  };

  const handleClick = () => {
    if (click === true) {
      setClick(false);
    } else if (click === false) {
      setClick(true);
    }
  };
  const { isLogged, logOut, isAdmin } = React.useContext(AuthContext);
  const { totalAmount } = React.useContext(CartContext);

  return (
    <div className="navbarcontainer">
      <nav className="navbar">
        <div className="nav-container">
          <ul className={!click ? "nav-menu left " : "nav-menu left"}>
            <li className="nav-item" onClick={handleClick}>
              {isLogged() ? (
                <NavLink to="" className="nav-links">
                  <LogoutIcon
                    onClick={logOutFunction}
                    style={{ paddingLeft: "1rem", color: "white" }}
                  />
                </NavLink>
              ) : (
                <NavLink to="/login" className="nav-links">
                  <PersonIcon style={{   color: "white" }} />
                </NavLink>
              )}
            </li>
            <li className="nav-item" onClick={handleClick}>
              {isAdmin() ? (
                <NavLink to="/admin" className="nav-links">
                  Administrar
                </NavLink>
              ) : null}
            </li>
          </ul>

          <NavLink to="/" className="nav-logo">
            <div className="iconCidenet"></div>
          </NavLink>

          <ul className={!click ? "nav-menu " : "nav-menu  active"}>
            <li className="nav-item" onClick={handleClick}>
              <NavLink to="/" className="nav-links" onClick={handleClick}>
                Inicio
              </NavLink>
            </li>
            <li className="nav-item" onClick={handleClick}>
              <NavLink
                to="/type/masculino"
                className="nav-links"
                onClick={handleClick}
              >
                Masculino
              </NavLink>
            </li>
            <li className="nav-item" onClick={handleClick}>
              <NavLink
                to="/type/femenino"
                className="nav-links"
                onClick={handleClick}
              >
                Femenino
              </NavLink>
            </li>

            <li className="nav-item hidden-desktop" onClick={handleClick}>
              {isLogged() ? (
                isAdmin() ? (
                  <div>
                    <NavLink to="/admin" className="nav-links">
                      Administrar
                    </NavLink>
                    <div>
                      <NavLink
                        to=""
                        onClick={logOutFunction}
                        type="button"
                        className="nav-links"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "red",
                        }}
                      >
                        Salir
                        <LogoutIcon
                          style={{ paddingLeft: "0.5rem", color: "white" }}
                        />
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  <LogoutIcon
                    onClick={logOutFunction}
                    style={{ paddingLeft: "1rem", color: "white" }}
                  />
                )
              ) : (
                <NavLink to="/login" className="nav-links">
                  <PersonIcon style={{ marginLeft: "1rem", color: "white" }} />
                </NavLink>
              )}
            </li>
          </ul>
          <div className="nav-item" onClick={handleClick}>
            <NavLink
              to="/cart"
              className="nav-links shopping"
              onClick={handleClick}
            >
              <Badge
                badgeContent={totalAmount()}
                color="primary"
                style={{ color: "white" }}
              >
                <ShoppingCartOutlinedIcon className="shopping" />
              </Badge>
            </NavLink>
          </div>
          <div className="nav-icon" onClick={handleClick}>
            <MenuIcon />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigateBar;
