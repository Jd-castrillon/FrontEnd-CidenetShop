import React, { FC, useState } from "react";

import { ItemProduct, OrderDetails } from "../types/ItemProduct";
import { CartContextType } from "../types/CartContextType";

const contextDefaultValues: CartContextType = {
  cartItem: [],
  addItemToCart: () => {},
  deleteProduct: () => {},
  totalCost: () => 0,
  totalAmount: () => 0,
  resetAmountCart: () => {},
  deleteByOutOfStock: () => {},
  updateStockInCart: () => {},
};

export const CartContext =
  React.createContext<CartContextType>(contextDefaultValues);

const CartProvider: FC = ({ children }) => {
  const [cartItem, setCartItem] = useState([] as ItemProduct[]);

  const addItemToCart = (itemCount: ItemProduct) => {
    if (
      cartItem.find(
        (item) => item.id === itemCount.id && item.size === itemCount.size
      )
    ) {
      const newCartItem = cartItem.map((item) => {
        if (item.id === itemCount.id && item.size === itemCount.size) {
          return { ...item, amount: itemCount.amount };
        }
        return item;
      });
      setCartItem(newCartItem);
    } else {
      setCartItem((state) => {
        return [...state, itemCount];
      });
    }
  };

  const updateStockInCart = (orderDetails: OrderDetails) => {
    const item = cartItem.find(
      (item) =>
        item.id === orderDetails.idProduct && item.size === orderDetails.size
    );
    if (item && orderDetails.quantity > 0) {
      item.amount = orderDetails.quantity;
    } else if (item && orderDetails.quantity === 0) {
      deleteByOutOfStock(orderDetails.idProduct, orderDetails.size);
    }
  };

  const deleteProduct = (itemCount: ItemProduct) => {
    const newItems = cartItem.filter(
      (item) => item.id !== itemCount.id || item.size !== itemCount.size
    );
    setCartItem(newItems);
  };

  const deleteByOutOfStock = (idProduct: number, size: string) => {
    const newItems = cartItem.filter(
      (item) => item.id !== idProduct || item.size !== size
    );
    setCartItem(newItems);
  };

  const totalCost = () => {
    const cost = cartItem.reduce(
      (accumulator, item) => accumulator + item.price * item.amount,
      0
    );
    return cost;
  };

  const totalAmount = () => {
    return cartItem.length;
  };

  const resetAmountCart = () => {
    setCartItem([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        addItemToCart,
        deleteProduct,
        deleteByOutOfStock,
        updateStockInCart,
        totalCost,
        totalAmount,
        resetAmountCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
