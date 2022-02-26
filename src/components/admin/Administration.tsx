import React, { useState } from "react";
import NavigateBar from "../header/NavigateBar";
import TableProducts from "./TableProducts";
import AddIcon from "@mui/icons-material/Add";
import AddProduct from "./AddProduct";
import Button from "@mui/material/Button";

const Administration = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const hanleCloseAddForm = () => {
    setShowAddForm(false);
  };

  if (showAddForm) {
    return <AddProduct open={showAddForm} handleClose={hanleCloseAddForm} />;
  }

  return (
    <div className="">
      <NavigateBar />

      <h1>Aca vamos a administrar los productos</h1>

      <div >
        <div>
          <Button
            variant="outlined"
            onClick={() => setShowAddForm(true)}
            style={{ display: "flex", alignItems: "center" }}
          >
            <AddIcon /> Agregar Producto
          </Button>
        </div>

        <TableProducts />
      </div>
    </div>
  );
};

export default Administration;
