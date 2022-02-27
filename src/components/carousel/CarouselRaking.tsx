import React, { useState, useEffect } from "react";
import { GetRankingProducts } from "../../service/GetRakingProducts";
import { ItemProduct } from "../../types/ItemProduct";

import { ImageList } from "@material-ui/core";

import ItemCarousel from "./ItemCarousel";


export const CarouselRaking = () => {
  const [listItemRaking, setListItemRaking] = useState([] as ItemProduct[]);

 
  const getListRankingProducts = async () => {
    const listRankingProducts = await GetRankingProducts().then((res) => res);

    setListItemRaking(listRankingProducts);
  };

  useEffect(() => {
    getListRankingProducts();
  }, []);

  return (
    <div className="carousel">
      <h3>Nuestros productos más destacados</h3>
      <div className="">
      <ImageList
        cols={7}
        className="carousel__grid-list"
        style={{ flexWrap: "nowrap", paddingTop: "1rem" }}
        gap={6}
      >
        {listItemRaking.map((item) => (
          <ItemCarousel key={item.id} item={item} />
        ))}
      </ImageList>
      </div>
    </div>
  );
};

export default CarouselRaking;
