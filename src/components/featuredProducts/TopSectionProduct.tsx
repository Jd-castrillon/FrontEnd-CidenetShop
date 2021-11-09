import React from "react";
import ArrowForward from "../layout/ArrowForward";
import TittleProducts from "./TittleProducts";



const TopSectionProduct = () => {
  return (
    <div className="FeaturedProducts__top flex flex-jc-sb">
      <TittleProducts />
      <ArrowForward />
    </div>
  );
};

export default TopSectionProduct;
