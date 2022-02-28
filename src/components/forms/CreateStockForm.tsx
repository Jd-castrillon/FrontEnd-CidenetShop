import React from "react";
import Button from "@mui/material/Button";
import { newExistingQuantity } from "../../types/NewExtingQuantity";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

import { FormikProps } from "formik";
import TextField from "@mui/material/TextField";

const CreateStockForm: (
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
    <div className="createStockForm">
      <h4>
        <b>Agregar Talla</b>
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="createStockForm-container">
          <div className="select">
            <InputLabel id="shortText">Talla</InputLabel>
            <Select
              id="shortText"
              name="shortText"
              onChange={handleChange}
              value={values.shortText}
              style={{ width: "13rem" }}
            >
              <MenuItem value="XS">XS</MenuItem>
              <MenuItem value="S">S</MenuItem>
              <MenuItem value="M">M</MenuItem>
              <MenuItem value="L">L</MenuItem>
              <MenuItem value="XL">XL</MenuItem>
            </Select>
          </div>
          <div>
            {errors.quantity && touched.quantity ? (
              <div
                style={{
                  color: "red",
                  paddingBottom: "0.1rem",
                  width: "10rem",
                }}
              >
                {errors.quantity}
              </div>
            ) : (
              <div
                style={{
                  color: "red",
                  paddingBottom: "0.3rem",
                  height: "0.9rem",
                  width: "10rem",
                }}
              ></div>
            )}
            <TextField
              type="text"
              id="quantity"
              name="quantity"
              value={values.quantity}
              onChange={handleChange}
              label="cantidad"
              className="input"
            ></TextField>
          </div>
          <Button
            type="submit"
            style={{
              fontFamily: "'Rubik', sans-serif",
              fontWeight: "lighter",
              letterSpacing: "0.1rem",
            }}
          >
            Crear
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateStockForm;
