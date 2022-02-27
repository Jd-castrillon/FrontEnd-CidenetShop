import React from "react";

import { ItemProduct } from "../../types/ItemProduct";
import ItemSectionProduct from "./ItemSectionProduct";

interface Props {
  list: ItemProduct[];
}

const ItemSectionProductList = ({ list }: Props) => {
  return (
    <div className="wrapper-items">
      {list.map((product: ItemProduct) => (
        <ItemSectionProduct key={product.id} item={product} />
      ))}
    </div>
  );
};

export default ItemSectionProductList;
