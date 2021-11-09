import React from "react";
import InputSearch from "./InputSearch";
import WrapperProduct from "./WrapperProduct";

const SearchBox = () => {
  return (
    <div className="searchBox">
      <InputSearch />
      <hr />
      <WrapperProduct />
    </div>
  );
};

export default SearchBox;
