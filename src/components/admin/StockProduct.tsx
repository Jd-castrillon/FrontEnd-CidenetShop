import React, { useEffect, useState } from "react";
import { ItemProduct, existingQuantity } from "../../types/ItemProduct";
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

interface Props {
  product: ItemProduct;
}

const StockProduct = ({ product }: Props) => {
  const { userOnline } = React.useContext(AuthContext);
  const [stock, setStock] = useState([] as existingQuantity[]);

  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const updateStockSchema = Yup.object();
  const createStockSchema = Yup.object();

  useEffect(() => {
    const getStock = async () => {
      const response = GetStock(product.id, userOnline[0].token);
      setStock(await response);
    };

    getStock();
  }, [product.id, userOnline, isUpdate, isDelete, isCreate]);

  const handleDelete = async (shortText: string) => {
    DeleteStock(product.id, shortText, userOnline[0].token);

    await setIsDelete(!isDelete);
  };

  if (showSpinner) {
    return <Spinner />;
  }

  return (
    <div style={{ paddingTop: "2rem" }} className="updateStock" >
      <div style={{paddingBottom:"1rem"}}>
        <h3>
          
          <b> Cantidades existentes</b>
        </h3>
      </div>
      <Formik<newExistingQuantity>
        initialValues={{
          idProduct: product.id,
          shortText: "",
          quantity: 0,
        }}
        validationSchema={createStockSchema}
        onSubmit={async (values) => {
          setShowSpinner(true);

          setTimeout(() => {
            CreateStock(
              values.idProduct,
              values.shortText,
              values.quantity,
              userOnline[0].token
            );
            setShowSpinner(false);
          }, 500);
        }}
        component={CreateStockForm}
      ></Formik>
      {stock.length > 0 && !showSpinner ? (
        stock.map((item) => {
          return (
            <div key={item.idSize} className="container">
              <div className="">{item.sizeShortText}</div>
              <div className="">{item.existingQuantity}</div>
              <Formik<newExistingQuantity>
                initialValues={{
                  idProduct: product.id,
                  shortText: item.sizeShortText,
                  quantity: 0,
                }}
                validationSchema={updateStockSchema}
                onSubmit={async (values) => {
                  UpdateStock(
                    values.idProduct,
                    values.shortText,
                    values.quantity,
                    userOnline[0].token
                  );
                  await setIsUpdate(!isUpdate);
                }}
                component={UpdateStockForm}
              ></Formik>
              <DeleteOutlineOutlinedIcon
                onClick={() => handleDelete(item.sizeShortText)}
              />
            </div>
          );
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default StockProduct;
