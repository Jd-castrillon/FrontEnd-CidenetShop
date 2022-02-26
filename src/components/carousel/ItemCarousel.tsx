import React from "react";
import { ItemProduct } from "../../types/ItemProduct";
import { Link } from "react-router-dom";

interface Props {
  item: ItemProduct;
}

const ItemCarousel = ({ item }: Props) => {
  const srcImage: string = `data:image/JPG;base64,${item.picture}`;

  return (
    <div className="itemCarousel">
      <div className="itemCarousel__container">
        <div className="container__image">
          <Link to={`/item/${item.id}`}>
            <img src={srcImage} alt={item.name} />
          </Link>
        </div>

        <div className="information">
          <h4>{item.name}</h4>

          <div className="">
            <b>$ {item.price}</b>
          </div>
        </div>

        <div className="container__button">
          <Link to={`/item/${item.id}`}>
            <button className="button">Ver más</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCarousel;
