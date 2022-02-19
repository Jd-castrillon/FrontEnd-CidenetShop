import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import ButtonAdmin from "./ButtonAdmin";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const IconsSesion = () => {
  const navigate = useNavigate();

  const { userOnline, removeUserOnline } = useContext(AuthContext);

  const logOut = () => {
    removeUserOnline();
    navigate("/");
  };

  if (userOnline.length > 0) {
    if (
      userOnline[0].authorities.find(
        (authority) => authority.authority === "admin"
      )
    ) {
      return (
        <div className="flex flex-jc-sb">
          <div>
            <button
              onClick={logOut}
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                height: "1.5rem",
              }}
            >
              <p style={{ color: "white" }}>Salir</p>{" "}
              <LogoutIcon style={{ paddingLeft: "0.5rem", color: "white" }} />
            </button>
          </div>
          <ButtonAdmin />
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={logOut} type="button">
            <LogoutIcon style={{ paddingLeft: "1rem", color: "white" }} />
          </button>
        </div>
      );
    }
  }

  return (
    <div>
      <Link to="/login">
        <PersonIcon style={{ paddingLeft: "1rem", color: "white" }} />
      </Link>
    </div>
  );
};

export default IconsSesion;
