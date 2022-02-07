import React from "react";

import { ItemProduct } from "../../types/ItemProduct";
import ItemSectionProduct from "./ItemSectionProduct";
import Box from "@material-ui/core/Box";

interface Props {
  list: ItemProduct[];
}

const ItemSectionProductList = ({ list }: Props) => {
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      flexWrap="wrap"
      paddingBottom="10px"
    >
      {list.map((product: ItemProduct) => (
        <ItemSectionProduct key={product.id} item={product} />
      ))}
    </Box>
  );
};

export default ItemSectionProductList;
