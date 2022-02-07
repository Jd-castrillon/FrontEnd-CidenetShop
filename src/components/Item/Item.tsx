import React from "react";
import { ItemProduct } from "../../types/ItemProduct";

type Props = {
  item: ItemProduct;
  handleAddToCart: (clickedItem: ItemProduct) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  let picture = [];
  picture.push(item.picture);

  return (
    <div
      onClick={() => handleAddToCart(item)}
      className="flex flex-ai-c "
      style={{ padding: "1rem" }}
    >
      <div>
        <img
          src={URL.createObjectURL(new Blob(picture, { type: "image/jpg" }))}
          alt={item.name}
          style={{ width: "3rem", height: "3rem" }}
        />
      </div>

      <div>
        <h5>{item.name}</h5>

        <p>{item.price}</p>

        <p>{item.color}</p>
      </div>
    </div>
  );
};

export default Item;
