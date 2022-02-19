import React from "react";

import { Link } from "react-router-dom";

const ButtonAdmin = () => {
  return (
    <div>
      <Link to="/admin" >
      <button className="header__buttons" type="button" >
        Administrar
      </button>
      </Link>
    </div>
  );
};

export default ButtonAdmin;
