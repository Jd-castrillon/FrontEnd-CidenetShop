import React from "react";
import Button from "@mui/material/Button";
import { newExistingQuantity } from "../../types/NewExtingQuantity";

import { FormikProps } from "formik";
import TextField from "@mui/material/TextField";

const UpdateStockForm: (
  props: FormikProps<newExistingQuantity>
) => JSX.Element = ({
  handleSubmit,
  values,
  handleChange,
  setFieldValue,
  errors,
  touched,
}) => {
  return (
    <div className="updateStockForm">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div>
            <TextField
              type="text"
              id="quantity"
              name="quantity"
              value={values.quantity}
              onChange={handleChange}
              label="cantidad"
            ></TextField>
          </div>
          <div>
            <Button type="submit">Actualizar</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateStockForm;
