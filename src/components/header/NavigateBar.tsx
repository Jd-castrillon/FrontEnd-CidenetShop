import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import IconsSesion from "./IconsSesion";
import IconCidenet from "../layout/IconCidenet";
import Badge from "@material-ui/core/Badge";
import { CartContext } from "../../context/CartProvider";
import { NavLink } from "react-router-dom";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { Link } from "react-router-dom";

const NavigateBar = () => {
  const [click, setClick] = useState(false);
  useEffect(() => {
  
  }, []);

  const handleClick = () => {
    if (click === true) {
      setClick(false);
    } else if (click === false) {
      setClick(true);
    }
  };

  const { totalAmount } = React.useContext(CartContext);

  return (
    <div>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            Cidenet
          </NavLink>

          <ul className={click ? "nav-menu" : "nav-menu active"}>
            <li className="nav-item" onClick={handleClick}>
              <NavLink
                to="/"
                className="nav-links active"
                onClick={handleClick}
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item" onClick={handleClick}>
              <NavLink
                to="/masculino"
                className="nav-links"
                onClick={handleClick}
              >
                Masculino
              </NavLink>
            </li>
            <li className="nav-item" onClick={handleClick}>
              <Link
                to="/femenino"
                className="nav-links"
                onClick={handleClick}
              >
                Femenino
              </Link>
            </li>
            <li className="nav-item" onClick={handleClick}>
              <NavLink to="/cart" className="nav-links" onClick={handleClick}>
                Carrito
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <MenuIcon />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigateBar;
