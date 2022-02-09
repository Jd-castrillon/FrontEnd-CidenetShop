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
import AddToOrder from "../../service/AddToOrder";

import TableCart from "./TableCart";
import NavigateBar from "../header/NavigateBar";

const Cart = () => {
  const { cartItem, resetAmountCart, updateStockInCart } =
    useContext(CartContext);
  const { userOnline } = useContext(AuthContext);
  const [setShowForm, setSetShowForm] = useState(false);
  const [orderOk, setOrderOk] = useState(false);
  const [orderBad, setOrderBad] = useState(false);
  const [outOfStockMessage, setOutOfStockMessage] = useState(false);
  const [departamento, setDepartamento] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
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

  if (cartItem.length === 0 && !orderOk && !orderBad) {
    return <NoProductMessage />;
  }

  const orderDetails: OrderDetails[] = AddToOrder();

  const order: Order = { orderAddress: "", orderDetails: [] };

  order.orderAddress = departamento + ", " + city + ", " + address;
  order.orderDetails = orderDetails;

  const handleClickOpen = async () => {
    if (userOnline.length > 0) {
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
    const queryOutOfStock = await QueryOutOfStock(
      orderDetails,
      userOnline[0].token
    );

    if (
      queryOutOfStock.message !== "Todos los productos tienen stock suficiente"
    ) {
      console.log(queryOutOfStock);

      queryOutOfStock.forEach((element: OrderDetails) => {
        updateStockInCart(element);
      });

      setSetShowForm(false);
      return setOutOfStockMessage(true);
    }

 
    const response = await PostCreateOrder(order, userOnline[0].token);
    console.log(response.message);

    if (response.message !== "Orden guardada") {
      console.log("No se pudo hacer la compra");
      setOrderBad(true);
      resetAmountCart();
    } else {
      resetAmountCart();
      setOrderOk(true);
    }
  };
  if (true) {
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
