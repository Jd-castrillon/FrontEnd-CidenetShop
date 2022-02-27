import React, { useState } from "react";
import NavigateBar from "../header/NavigateBar";
import TableProducts from "./TableProducts";

import AddProduct from "./AddProduct";


const Administration = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const hanleCloseAddForm = () => {
    setShowAddForm(false);
  };

  if (showAddForm) {
    return <AddProduct open={showAddForm} handleClose={hanleCloseAddForm} />;
  }

  return (
    <div className="adminSection">
      <NavigateBar />

      <h2>Zona VIP</h2>

      <div className="wrapper-tableProducts">
        
        <TableProducts />
      </div>
    </div>
  );
};

export default Administration;
