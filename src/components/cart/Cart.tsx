import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider";
import { AuthContext } from "../../context/AuthProvider";

import NoProductMessage from "./NoProductMessage";
import OrderAccepted from "./OrderAccepted";
import OrderRefusedMessage from "./OrderRefusedMessage";
import OutOfStockMessage from "./OutOfStockMessage";
import { useNavigate } from "react-router-dom";
import Formulario from "../forms/BuyForm";
import QueryOutOfStock from "../../service/QueryOutOfStock";
import { PostCreateOrder } from "../../service/PostCreateOrder";
import { Order, OrderDetails } from "../../types/ItemProduct";
import Spinner from "../spinner/Spinner";
import AddToOrder from "../../service/AddToOrder";

import TableCart from "./TableCart";
import NavigateBar from "../header/NavigateBar";

const Cart = () => {
  const { getCart, resetAmountCart, updateStockInCart } =
    useContext(CartContext);
  const { getToken  , isLogged } = useContext(AuthContext);
  const [setShowForm, setSetShowForm] = useState(false);
  const [orderOk, setOrderOk] = useState(false);
  const [orderBad, setOrderBad] = useState(false);
  const [outOfStockMessage, setOutOfStockMessage] = useState(false);
  const [departamento, setDepartamento] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const onChangeAddress = (n: any) => {
    setAddress(n);
  };

  const onChangeCity = (n: any) => {
    setCity(n);
  };

  const onChangeDepartamento = (n: any) => {
    setDepartamento(n);
  };

  if (
    getCart().length === 0 &&
    !orderOk &&
    !orderBad &&
    !outOfStockMessage &&
    !spinner
  ) {
    return <NoProductMessage />;
  }

  const orderDetails: OrderDetails[] = AddToOrder();

  const order: Order = { orderAddress: "", orderDetails: [] };

  order.orderAddress = departamento + ", " + city + ", " + address;
  order.orderDetails = orderDetails;

  const handleClickOpen = async () => {
    if (isLogged()) {
      setSetShowForm(true);
    } else {
      navigate("/login");
    }
  };

  const handleClose = () => {
    setSetShowForm(false);
  };

  const handleCloseOutOfStockMessage = () => {
    setOutOfStockMessage(false);
  };

  const handleCreateOrder = async () => {
    setSpinner(true);
    const queryOutOfStock = await QueryOutOfStock(
      orderDetails,
      getToken()
    );
    if(queryOutOfStock.message === "Don't found ExistingQuantity"){
      resetAmountCart();
      setSpinner(false);
      setSetShowForm(false);
      return setOutOfStockMessage(true);
    }

    if (
      queryOutOfStock.message !== "All products have enough stock"
    ) {
      queryOutOfStock.forEach((element: OrderDetails) => {
        updateStockInCart(element);
      });

      setSpinner(false);
      setSetShowForm(false);
      return setOutOfStockMessage(true);
    }
    const response = await PostCreateOrder(order, getToken());

    if (response.message !== "Orden guardada") {
      setSpinner(false);
      console.log("No se pudo hacer la compra");
      setOrderBad(true);
      resetAmountCart();
    } else {
      setSpinner(false);
      resetAmountCart();
      setOrderOk(true);
    }
  };
  if (spinner) {
    return <Spinner />;
  }

  if (orderOk) {
    return <OrderAccepted />;
  }

  if (orderBad) {
    return <OrderRefusedMessage />;
  }

  return (
    <div>
      <NavigateBar />

      {setShowForm ? (
        <Formulario
          open={setShowForm}
          handleClose={handleClose}
          onChangeAddress={onChangeAddress}
          onChangeCity={onChangeCity}
          onChangeDepartamento={onChangeDepartamento}
          handleCreateOrder={handleCreateOrder}
        />
      ) : outOfStockMessage ? (
        <OutOfStockMessage
          openOutOfStockMessage={outOfStockMessage}
          handleCloseOutOfStockMessage={handleCloseOutOfStockMessage}
        />
      ) : (
        <>
          <TableCart setShowForm={handleClickOpen} />
        </>
      )}
    </div>
  );
};

export default Cart;
