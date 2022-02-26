import React, { FC } from "react";

import { ItemProduct, OrderDetails } from "../types/ItemProduct";
import { CartContextType } from "../types/CartContextType";

const contextDefaultValues: CartContextType = {
  getCart: () => [],
  setCart: () => {},
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
  const cartItem: ItemProduct[] = [];

  const getCart = () => {
    const car = localStorage.getItem("Car");
    if (car !== null && car !== undefined) {
      const carProducts: ItemProduct[] = JSON.parse(car);
      if (carProducts !== undefined && carProducts !== null) return carProducts;
    }
    return [];
  };

  const setCart = (itemList: ItemProduct[]) => {
    localStorage.setItem("Car", JSON.stringify(itemList));
  };

  const addItemToCart = (itemCount: ItemProduct) => {
    if (
      getCart().find(
        (item) => item.id === itemCount.id && item.size === itemCount.size
      )
    ) {
      const newCartItem = getCart().map((item) => {
        if (item.id === itemCount.id && item.size === itemCount.size) {
          return { ...item, amount: itemCount.amount };
        }
        return item;
      });
      setCart(newCartItem);
    } else {
      const newListCart = getCart();
      newListCart.push(itemCount);
      setCart(newListCart);
    }
  };

  const updateStockInCart = (orderDetails: OrderDetails) => {
    const item = getCart().find(
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
    const newItems = getCart().filter(
      (item) => item.id !== itemCount.id || item.size !== itemCount.size
    );
    setCart(newItems);
  };

  const deleteByOutOfStock = (idProduct: number, size: string) => {
    const newItems = getCart().filter(
      (item) => item.id !== idProduct || item.size !== size
    );
    setCart(newItems);
  };

  const totalCost = () => {
    const cost = getCart().reduce(
      (accumulator, item) => accumulator + item.price * item.amount,
      0
    );
    return cost;
  };

  const totalAmount = () => {
    const car = localStorage.getItem("Car");
    if (car !== null && car !== undefined) {
      const carProducts: ItemProduct[] = JSON.parse(car);
      if (carProducts !== undefined && carProducts !== null)
        return carProducts.length;
    }

    return 0;
  };

  const resetAmountCart = () => {
    localStorage.removeItem("Car");
  };

  return (
    <CartContext.Provider
      value={{
        getCart,
        setCart,
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
