import { ItemProduct } from "./ItemProduct";
import { OrderDetails } from "./ItemProduct";
export type CartContextType = {
    getCart:() =>  ItemProduct[]
    setCart: (itemList:ItemProduct[]) => void;
    cartItem: ItemProduct[];
    addItemToCart: (itemCount: ItemProduct) => void;
    deleteProduct: (itemCount: ItemProduct) => void;
    totalCost: () => number;
    totalAmount: () => number;
    resetAmountCart: () => void;
    deleteByOutOfStock: (idProduct: number , size:string) => void;
    updateStockInCart:(orderDetails: OrderDetails) => void;
    
  };