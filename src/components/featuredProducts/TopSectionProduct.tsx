import React from "react";
import ArrowForward from "../layout/ArrowForward";
import TittleProducts from "./TittleProducts";
import "../../styles/_globals.scss";
import "../../styles/_sectionProducts.scss"

const TopSectionProduct = () => {
  return (
    <div className="sectionProducts__top flex flex-jc-sb">
      <TittleProducts />
      <ArrowForward />
    </div>
  );
};

export default TopSectionProduct;
