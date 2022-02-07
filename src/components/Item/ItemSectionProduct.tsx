import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import { Navigate } from "react-router";
import Box from "@material-ui/core/Box";

// Types
import { ItemProduct } from "../../types/ItemProduct";

type Props = {
  item: ItemProduct;
};

const ItemSectionProduct: React.FC<Props> = ({ item }) => {
  let urlImage: string = `data:image/JPG;base64,${item.picture}`;

  const hanleNaviagte = () => {
    <Navigate to={`/item/${item.id}`}></Navigate>;
  };

  return (
    <div
      className="section-products__wrapper-items "
      style={{ marginRight: "5rem" }}
    >
      <div className="section-products__wrapper-image" onClick={hanleNaviagte}>
        <Box>
          <Link to={`/item/${item.id}`}>
            <img
              src={urlImage}
              alt={item.name}
              className="section-products__image"
              width="350"
            />
          </Link>
        </Box>
      </div>

      <div className="section-products__information">
        <div>
          <h6 style={{ margin: "0px", padding: "0.3rem" }}>{item.name}</h6>
        </div>
        <div className="flex felx-jc-sb">
          <p
            style={{
              fontSize: "0.7rem",
              margin: "0",
              paddingTop: "0.2rem",
              fontWeight: "bolder",
            }}
          >
            precio:{" "}
          </p>{" "}
          <p
            style={{
              margin: "0px",
              padding: "0.3rem",
              fontWeight: "revert",
              fontSize: "0.7rem",
            }}
          >
            {item.price}
          </p>
        </div>
        <Link to={`/item/${item.id}`}>
          <button className="">
            <AddShoppingCartIcon className="section-products__button" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ItemSectionProduct;
