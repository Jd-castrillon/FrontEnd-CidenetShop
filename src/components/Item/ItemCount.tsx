
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from "@material-ui/core/Box";
import { ItemProduct } from "../../types/ItemProduct";

import React from "react";

interface Props {
  item: ItemProduct;
  min: number;
  count: number;
  sizeShortText:  string;
  setCount: any;
}

const ItemCount = ({ item, min, count, setCount, sizeShortText }: Props) => {
  
  const add = () => {
    item.existingQuantity.forEach((size) => {
      if (size.sizeShortText === sizeShortText) {
        if (count < size.existingQuantity) {
          setCount( count + 1);
        }
      }
    });
  };

  const subtract = () => {
    if (count > min) setCount ( count - 1);
  };

  const stock = () => {
    const i = item.existingQuantity.find(e => e.sizeShortText === sizeShortText)
    if (i !== undefined) {
      return i.existingQuantity
    }else
    return 0;
   
  }

  return (
    <div>
      <Box flexDirection="colum" width="185px" height="70px">
        <Box
          display="flex"
          justifyContent="space-between"
          border="solid 1px black"
          borderRadius="8px"
        >
          {stock() > 0 && (
            <>
              <button>
              <RemoveCircleIcon
                style={{ fontSize: 30 }}
                onClick={subtract}>
                </RemoveCircleIcon>
                </button>
              <span style={{ paddingTop: "7px" }}>{count}</span>
              <button>
              <AddCircleIcon  onClick={add}  style={{ fontSize: 30 }} ></AddCircleIcon>

              </button>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default ItemCount;
