import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import { ItemProduct } from "../types/ItemProduct";
import ItemSectionProductList from "../components/Item/ItemSectionProductList";
import Spinner from "../components/spinner/Spinner";
import ImageHero from "../components/hero/ImageHero";
import CarouselRaking from "../components/carousel/CarouselRaking";

import TextField from "@mui/material/TextField";


const ItemListContainer = () => {
  const [itemProduct, setItemProduct] = useState([] as ItemProduct[]);
  const [itemsFilter, setItemsFilter] = useState([] as ItemProduct[]);

  const { productType = "" } = useParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    let url: string = `http://localhost:7070/jdshop/products/${productType}`;

    const getProducts = async (): Promise<ItemProduct[]> => {
      const res = await await fetch(url, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2MzgyMDYyNzEsImV4cCI6MTYzODI5MjY3MX0.l-V6qKIcRAuEGxvTTbGgXc1lPD_eRwl7XUItKvz9YywuIfIW8Tj_w7r2SRM3Hwnn5yvAuVlRl32TucuNaSnOXg",
        },
      }).then((res) => res.json());

      return res;
    };

    if (productType) {
      getProducts().then((res) => setItemProduct(res));
    } else {
      getProducts().then((res) => setItemProduct(res));
    }
  }, [productType]);



  const hanledChange = (e: any) => {
    setSearch(e.target.value);
    filter(e.target.value);
  };

  const filter = (filter: string) => {
    let items: ItemProduct[] = itemProduct.filter((item: ItemProduct) => {
      if (
        item.name.toString().toLowerCase().includes(filter.toLowerCase()) ||
        item.color.toString().toLowerCase().includes(filter.toLowerCase())
      ) {
        return item;
      }
      return null;
    });

    setItemsFilter(items);
  };

  if (itemProduct.length < 1) {
    return <Spinner />;
  }

  const  sectionImage = productType

  return (
    <div className="section-products__wrapper-products">
      <ImageHero sectionImage={sectionImage} />
     
      <CarouselRaking />
      
      
      <div className="section-products__wrapper-input">
        
        <TextField
            
            autoFocus
            margin="dense"
            id="search"
            label="¿Buscas un nuevo look?"
            type="text"
            fullWidth
            variant="standard"
            value={search}
            onChange={hanledChange}
          />
      </div>
     
      {itemsFilter.length > 0 ? (
        <ItemSectionProductList list={itemsFilter} />
      ) : (
        <ItemSectionProductList list={itemProduct} />
      )}
    </div>
  );
};

export default ItemListContainer;
