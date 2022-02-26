import React from "react";

import IconsSesion from "./IconsSesion";
import IconCidenet from "../layout/IconCidenet";
import Badge from "@material-ui/core/Badge";
import { CartContext } from "../../context/CartProvider";


import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { Link } from "react-router-dom";

const NavigateBar = () => {
  const { totalAmount } = React.useContext(CartContext);

  return (
    <div className="flex flex-ai-c header__wrapper ">
      <nav className="header__navbar flex flex-jc-sb flex-jc-ai-c">
        <div className="header__wrapper-burgger-menu flex flex-jc-sb">
          <div style={{ height: "10px" }}>
            <IconsSesion></IconsSesion>
          </div>
        </div>

        <div className="header__iconCidenet">
            <button type="button">
          <Link to="/">
              <IconCidenet />
          </Link>
            </button>
        </div>

        <div className="flex flex-jc-sb header__wrapper-buttons">
          <Link to="/">
            <button className="header__buttons" type="button">
              Inicio
            </button>
          </Link>
          <Link to="/type/masculino">
            <button className="header__buttons" type="button">
              Masculino
            </button>
          </Link>
          <Link to="/type/femenino">
            <button className="header__buttons" type="button">
              Femenino
            </button>
          </Link>
          <Link to="/cart">
            <div>
              <Badge
                badgeContent={totalAmount()}
                color="primary"
                style={{ color: "white" }}
              >
                <ShoppingCartOutlinedIcon
                  style={{ color: "white" }}
                ></ShoppingCartOutlinedIcon>
              </Badge>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavigateBar;
