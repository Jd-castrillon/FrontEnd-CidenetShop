import React from "react";
import DescriptionProduct from "./DescriptionProduct";
import ImageProduct from "./ImageProduct";

const WrapperProduct = () => {
  return (
    <div className="searchBox flex flex-jc-sb">
      <ImageProduct />
      <DescriptionProduct />
    </div>
  );
};

export default WrapperProduct;
