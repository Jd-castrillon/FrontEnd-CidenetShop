import * as React from 'react';

import { CartContext } from "../context/CartProvider";
import { OrderDetails } from "../types/ItemProduct";

const AddToOrder = () => {

    const listOrderDetails: OrderDetails[] = [];

    const { cartItem } =
        React.useContext(CartContext);

    const addToOrder = () =>
        cartItem.forEach((item) => {
            const orderDetail: OrderDetails = { idProduct: 0, size: "", quantity: 0 };
            orderDetail.idProduct = item.id;
            orderDetail.size = item.size;
            orderDetail.quantity = item.amount;
            listOrderDetails.push(orderDetail);
        });

    addToOrder();

    return listOrderDetails
}

export default AddToOrder
