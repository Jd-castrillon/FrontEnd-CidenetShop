import * as React from 'react';

import { CartContext } from "../context/CartProvider";
import { OrderDetails } from "../types/ItemProduct";

const AddOrderDetailsToOrder = () => {

    const listOrderDetails: OrderDetails[] = [];

    const { getCart } =
        React.useContext(CartContext);

    const addToOrder = () =>
        getCart().forEach((item) => {
            const orderDetail: OrderDetails = { idProduct: 0, size: "", quantity: 0 };
            orderDetail.idProduct = item.id;
            orderDetail.size = item.size;
            orderDetail.quantity = item.amount;
            listOrderDetails.push(orderDetail);
        });

    addToOrder();

    return listOrderDetails
}

export default AddOrderDetailsToOrder
