import React from "react";
import "../../styles/_globals.scss";
import "../../styles/Navbar.css";


import SearchCar from "./IconsNavbar";
import MenusNavbar from "./MenusNavbar";
import IconCidenet from "../layout/IconCidenet";

const navbar = () => {
  return (
    <div>
      <nav className="flex flex-jc-sb navbar">
        <MenusNavbar />
        <IconCidenet />
        <SearchCar />
      </nav>
    </div>
  );
};

export default navbar;
