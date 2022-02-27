import React from "react";


import { NavLink } from "react-router-dom";

const ButtonAdmin = () => {
  return (
    <div className="nav-item">
      <NavLink to="/admin" className="nav-links">
        Administrar
      </NavLink>
    </div>
  );
};

export default ButtonAdmin;
