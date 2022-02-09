import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Spinner from "../components/spinner/Spinner";
import ItemDetail from "../components/Item/ItemDetail";
import { ItemProduct } from "../types/ItemProduct";

import ImageHero from "../components/hero/ImageHero";
import NavigateBar from "../components/header/NavigateBar";

export const ItemProductDefaultValues: ItemProduct = {
  id: 0,
  name: "",
  color: "",
  productType: "",
  brand: "",
  existingQuantity: [],
  picture: "",
  description: "",
  price: 0,
  amount: 0,
  size:"",
};

const ItemDetailContainer = () => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState<ItemProduct>(ItemProductDefaultValues);

  const { productId = "1" } = useParams();

  useEffect(() => {
    setLoading(true);
    let url: string = `http://localhost:7070/jdshop/products/id/${productId}`;

    const getProducts = async (): Promise<ItemProduct> => {
      const res =  await fetch(url, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2MzgyMDYyNzEsImV4cCI6MTYzODI5MjY3MX0.l-V6qKIcRAuEGxvTTbGgXc1lPD_eRwl7XUItKvz9YywuIfIW8Tj_w7r2SRM3Hwnn5yvAuVlRl32TucuNaSnOXg",
        },
      }).then((res) => res.json());

      
      return res;
    };

    getProducts().then((res) => {
      setLoading(false);
      setItem(res);
    });

    
  }, [productId]);

  return (
    <div>
      <NavigateBar />
      <ImageHero sectionImage=""/>
      <Box minHeight="70vh">
        {loading === true ? <Spinner /> : <ItemDetail item={item} />}
      </Box>
    </div>
  );
};

export default ItemDetailContainer;
