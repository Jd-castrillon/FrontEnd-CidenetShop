import React from "react";

import "../../styles/_globals.scss";
import "../../styles/_header.scss"
const IconMenuOutLine = () => {
  return (
    <div>
      <a id="btnHamburger" href="home" className="button header__toggle ">
        <span></span>
        <span></span>
        <span></span>
      </a>
    </div>
  );
};

export default IconMenuOutLine;
