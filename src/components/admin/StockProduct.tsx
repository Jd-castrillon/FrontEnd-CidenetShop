import React, { useEffect, useState } from "react";
import { existingQuantity } from "../../types/ItemProduct";
import { ItemAdminProduct } from "../../types/ItemAdminProduct";
import { newExistingQuantity } from "../../types/NewExtingQuantity";
import GetStock from "../../service/GetStock";
import UpdateStock from "../../service/UpdateStock";
import { AuthContext } from "../../context/AuthProvider";
import { Formik } from "formik";
import * as Yup from "yup";
import UpdateStockForm from "../forms/UpdateStockForm";
import CreateStockForm from "../forms/CreateStockForm";
import CreateStock from "../../service/CreateStock";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteStock from "../../service/DeleteStock";
import Spinner from "../spinner/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { Table, TableBody, TableCell } from "@material-ui/core";
import { TableContainer, TableHead, TableRow } from "@material-ui/core";

interface Props {
  product: ItemAdminProduct;
}

const StockProduct = ({ product }: Props) => {
  const { getToken } = React.useContext(AuthContext);
  const [stock, setStock] = useState([] as existingQuantity[]);

  const [showSpinner, setShowSpinner] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isArrayUpdate, setIsArrayUpdate] = useState<number>(0);

  const digitsOnly = (value: any) => /^\d+$/.test(value);

  const updateStockSchema = Yup.object().shape({
    quantity: Yup.number()
      .typeError("Se espera un número")
      .test("Digits only", "Se espera un número", digitsOnly),
  });
  const createStockSchema = Yup.object().shape({
    quantity: Yup.number()
      .typeError("Se espera un número")
      .test("Digits only", "Se espera un número", digitsOnly)
      .test(
        "greaterThan0",
        "Valor inválido",
        (value) => value !== undefined && value > 0
      ),
    shortText: Yup.string().required("Se requiere talla"),
  });

  useEffect(() => {
    const ac = new AbortController();
    const getStock = async () => {
      const response = GetStock(product.id, getToken());
      setStock(await response);
    };

    getStock();
    return () => ac.abort(); // Abort both fetches on unmount
  }, [product, isUpdate, isArrayUpdate, getToken]);

  const handleDelete = async (shortText: string) => {
    setIsUpdate(true);
    deleted();
    setTimeout(() => {
      DeleteStock(product.id, shortText, getToken());
      setIsUpdate(false);
    }, 100);
  };

  if (showSpinner) {
    return <Spinner />;
  }
  const error = () => toast.error("Algo ha salido mal.");
  const errorFound = () => toast.error("No se ha encontrado la talla.");
  const errorExists = (shortText: string) =>
    toast.error(`La talla: ${shortText} ya existe.`);
  const errorQuantity = () =>
    toast.error("La cantidad solicitada es inválida.");
  const created = () => toast.success("Se ha creado nueva talla.");
  const deleted = () => toast.success("Se ha eliminado talla");
  const update = (shortText: string) =>
    toast.success(`Se ha actializado el Stock en la talla ${shortText}`);

  return (
    <div style={{ paddingTop: "2rem" }} className="updateStock">
      <Toaster />
      <div
        style={{
          paddingBottom: "1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h3>
          <b> Cantidades existentes</b>
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingBottom: "1rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Formik<newExistingQuantity>
            initialValues={{
              idProduct: product.id,
              shortText: "",
              quantity: 0,
            }}
            validationSchema={createStockSchema}
            onSubmit={async (values) => {
              setShowSpinner(true);
              setIsUpdate(true);

              setTimeout(() => {
                setIsUpdate(false);
                const response = CreateStock(
                  values.idProduct,
                  values.shortText,
                  values.quantity,
                  getToken()
                );

                response.then(async (res) => {
                  if (res.message === "ExistingQuantity created") {
                    setShowSpinner(false);
                    await setIsArrayUpdate(2);
                    created();
                    setIsUpdate(false);
                    setIsArrayUpdate(1);
                  } else if (
                    res.message === "That ExistingQuantity already exists"
                  ) {
                    errorExists(values.shortText);
                  } else {
                    error();
                  }
                });

                setIsUpdate(false);
                setShowSpinner(false);
              }, 500);
            }}
            component={CreateStockForm}
          ></Formik>
        </div>
        <div>
          <Formik<newExistingQuantity>
            initialValues={{
              idProduct: product.id,
              shortText: "",
              quantity: 0,
            }}
            validationSchema={updateStockSchema}
            onSubmit={async (values) => {
              setIsUpdate(true);
              setTimeout(() => {
                setIsUpdate(false);
                const response = UpdateStock(
                  values.idProduct,
                  values.shortText,
                  values.quantity,
                  getToken()
                );
                values.quantity = 0;

                response.then(async (res) => {
                  if (res.message === "Stock was update") {
                    update(values.shortText);
                    await setIsArrayUpdate(2);
                    setIsUpdate(false);
                    setIsArrayUpdate(1);
                  } else if (res.message === "Quantity is invalid") {
                    errorQuantity();
                  } else if (res.message === "Don't found ExistingQuantity") {
                    errorFound();
                  } else {
                    error();
                  }
                });

                setIsUpdate(false);
              }, 500);
            }}
            component={UpdateStockForm}
          ></Formik>
        </div>
      </div>

      <h4 style={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
        <b>Stock disponible</b>
      </h4>
      {!showSpinner ? (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: 50, textAlign: "center" }}>
                    Talla
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ minWidth: 80, textAlign: "center" }}
                  >
                    Cantidad
                  </TableCell>

                  <TableCell align="center" style={{ minWidth: 50 }}>
                    Eliminar
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stock.map((stock, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {stock.sizeShortText}
                      </TableCell>
                      <TableCell align="center">
                        {stock.existingQuantity}
                      </TableCell>

                      <TableCell align="center">
                        {" "}
                        <DeleteOutlineOutlinedIcon
                          onClick={() => handleDelete(stock.sizeShortText)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default StockProduct;
