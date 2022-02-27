import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import { Navigate } from "react-router";

import { ItemProduct } from "../../types/ItemProduct";

// Types

type Props = {
  item: ItemProduct;
};

const ItemSectionProduct: React.FC<Props> = ({ item }) => {
  let urlImage: string = `data:image/JPG;base64,${item.picture}`;

  const hanleNaviagte = () => {
    <Navigate to={`/item/${item.id}`}></Navigate>;
  };

  return (
    <div className="item-sectionProducts-container">
      <div className="image" onClick={hanleNaviagte}>
        <Link to={`/item/${item.id}`}>
          <img src={urlImage} alt={item.name} />
        </Link>
      </div>

      <div className="information">
        <h4>{item.name}</h4>

        <div className="flex felx-jc-sb">
          <p><b>$</b></p>
          <p>{item.price}</p>
        </div>
        <Link to={`/item/${item.id}`}>
          <button className="button">
            <AddShoppingCartIcon fontSize="small" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ItemSectionProduct;
