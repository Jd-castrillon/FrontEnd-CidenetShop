import React from "react";

import SearchCar from "./IconsNavbar";
import MenusNavbar from "./MenusNavbar";
import IconCidenet from "../layout/IconCidenet";

const navbar = () => {
  return (
    <div>
      <nav className="header__navbar flex flex-jc-sb flex-jc-ai-c ">
        <MenusNavbar />
        <IconCidenet />
        <SearchCar />
      </nav>
    </div>
  );
};

export default navbar;
