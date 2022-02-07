import React, { useState, useContext, useEffect } from "react";

import { ItemProduct } from "../../types/ItemProduct";
import { CartContext } from "../../context/CartProvider";
import ItemCount from "./ItemCount";

import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { findFirstSize } from "../../service/findFirstSize";

interface Props {
  item: ItemProduct;
}

const ItemDetail = ({ item }: Props) => {
  const [count, setCount] = useState(1);
  const [selectCount, setSelectCount] = useState(false);
  const { addItemToCart } = useContext(CartContext);
  const [size, setSize] = useState("");

  useEffect(() => {
    const firstSize = findFirstSize(item);

    if (item !== undefined && firstSize !== undefined) {
      setSize(firstSize.sizeShortText);
    }
  }, [item]);

  const handleClickBuy = () => {
    if (count > 0) {
      setSelectCount(true);
      addItemToCart({
        id: item.id,
        name: item.name,
        color: item.color,
        productType: item.productType,
        brand: item.brand,
        existingQuantity: item.existingQuantity,
        picture: item.picture,
        description: item.description,
        price: item.price,
        amount: count,
        size: size,
      });
    }
  };

  let urlImage: string = `data:image/JPG;base64,${item.picture}`;

  const onSelectChange = (e: any) => {
    setSize(e.target.value);
    setCount(1);
  };

  const stock = () => {
    const i = item.existingQuantity.find((e) => e.sizeShortText === size);
    if (i !== undefined) {
      return i.existingQuantity;
    } else return 0;
  };

  return (
    <div className="detail-product">
      <Box className="container">
        <Box flexDirection="colum" className="image-title">
          <h2>
            {" "}
            <b> {item.name}</b>{" "}
          </h2>
          <img src={urlImage} alt="img" />
        </Box>
        <Box className="details">
          <p>
            <b>Marca:</b> {item.brand}
          </p>
          <div className="description">
            <b> {item.description} </b>
          </div>
          <p>
            <b>Precio: $</b> {item.price}
          </p>
          <div className="select">
            <p>
              <b>Talla :</b>{" "}
            </p>

            <select
              name="sizes"
              id="sizes"
              value={size}
              onChange={onSelectChange}
            >
              {item.existingQuantity.map((size) => (
                <option key={size.idSize} value={size.sizeShortText}>
                  {size.sizeShortText}
                </option>
              ))}
            </select>
          </div>
          <p>
            {" "}
            <b>Cantidades disponibles:</b> {stock()}{" "}
          </p>
          <ItemCount
            sizeShortText={size}
            setCount={setCount}
            count={count}
            min={1}
            item={item}
          />
          {selectCount ? (
            <div className="container__buttons">
              <div>
                <Link style={{ textDecoration: "none" }} to="/cart">
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={stock() === 0}  
                    style={{
                      marginBottom: "20px",
                      backgroundColor: "#000",

                      marginRight: "1.5rem",
                    }}
                  >
                    Finalizar compra
                  </Button>
                </Link>
              </div>
              <div>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: "#4A8BFD" }}
                  >
                    Continuar comprando
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <Button
              variant="contained"
              style={{ backgroundColor: "#000", color: "#fff" }}
              fullWidth
              onClick={handleClickBuy}
              className="button"
              disabled={stock() === 0}
            >
              Añadir al carrito
            </Button>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default ItemDetail;
