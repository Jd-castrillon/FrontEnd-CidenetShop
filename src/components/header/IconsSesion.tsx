import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import ButtonAdmin from "./ButtonAdmin";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const IconsSesion = () => {
  const navigate = useNavigate();

  const { isLogged, logOut, isAdmin } = useContext(AuthContext);

  const logOutFunction = () => {
    logOut();
    navigate("/");
  };

  if (isLogged()) {
    if (isAdmin()) {
      return (
        <div className="flex flex-jc-sb nav-menu active ">
          <div>
            <NavLink
              to=""
              onClick={logOutFunction}
              type="button"
              className="nav-item"
              style={{ display: "flex", alignItems: "center" }}
            >
              <p style={{ color: "white" }}>Salir</p>{" "}
              <LogoutIcon style={{ paddingLeft: "0.5rem", color: "white" }} />
            </NavLink>
          </div>
          <ButtonAdmin />
        </div>
      );
    } else {
      return (
        <div>
          <LogoutIcon
            onClick={logOutFunction}
            style={{ paddingLeft: "1rem", color: "white" }}
          />
        </div>
      );
    }
  }

  return (
    <div className=" nav-item " >
      <NavLink to="/login" className="nav-links">
       <PersonIcon />
      </NavLink>
    </div>
  );
};

export default IconsSesion;
