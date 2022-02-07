import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import IconMenuOutLine from "../layout/IconMenuOutLine";
import IconCidenet from "../layout/IconCidenet";
import Badge from "@material-ui/core/Badge";
import { CartContext } from "../../context/CartProvider";


import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { Link } from "react-router-dom";

const NavigateBar = () => {
  // const [user, setUser] = useState("");

  const { totalAmount } = React.useContext(CartContext);

  return (
    <div className="flex flex-ai-c header__wrapper ">
      <nav className="header__navbar flex flex-jc-sb flex-jc-ai-c">
        <div className="header__wrapper-burgger-menu flex flex-jc-sb">
          <div>
            <IconMenuOutLine />
          </div>
          <div style={{ height: "10px" }}>
            <Link to="/login">
              <PersonIcon style={{ paddingLeft: "1rem", color: "white" }} />
            </Link>
          </div>
        </div>

        <div className="header__iconCidenet">
          <Link to="/">
            <button type="button">
              <IconCidenet />
            </button>
          </Link>
        </div>

        <div className="flex flex-jc-sb header__wrapper-buttons">
          <Link to="/">
            <button className="header__buttons" type="button">
              Home
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
