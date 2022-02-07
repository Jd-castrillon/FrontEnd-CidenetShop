import React, { useState, useEffect } from "react";
import { GetRankingProducts } from "../../service/GetRakingProducts";
import { ItemProduct } from "../../types/ItemProduct";

import { ImageList } from "@material-ui/core";
import { ImageListItem } from "@material-ui/core";
import { ImageListItemBar } from "@material-ui/core";


import { Link } from "react-router-dom";
// import Item from "../Item/Item";

export const CarouselRaking = () => {
  const [listItemRaking, setListItemRaking] = useState([] as ItemProduct[]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getListRankingProducts = async () => {
    const listRankingProducts = await GetRankingProducts().then((res) => res);

    setListItemRaking(listRankingProducts);
  };

  useEffect(() => {
    getListRankingProducts();
  }, []);

  return (
    <div className="carousel__root">
      <h3>
        <b>Nuestros productos más destacados</b>
      </h3>
      <ImageList
        cols={7}
        className="carousel__grid-list"
        style={{ flexWrap: "nowrap", paddingTop: "1rem" }}
        gap={6}
      >
        {listItemRaking.map((item) => (
          <ImageListItem
            key={item.picture}
            className="carousel__grid-list"
            style={{ whiteSpace: "nowrap" }}
          >
            <img
              src={`data:image/JPG;base64,${item.picture}`}
              alt={item.name}
              className="image.carousel"
            />
            <Link to={`/item/${item.id}`}>
              <ImageListItemBar
                className="item-list"
                title={item.name}
                
              ></ImageListItemBar>
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default CarouselRaking;
