import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import { ItemProduct } from "../types/ItemProduct";
import ItemSectionProductList from "../components/Item/ItemSectionProductList";
import Spinner from "../components/spinner/Spinner";
import ImageHero from "../components/hero/ImageHero";
import CarouselRaking from "../components/carousel/CarouselRaking";

import TextField from "@mui/material/TextField";
import NavigateBar from "../components/header/NavigateBar";

import GetActiveProducts from "../service/GetActiveProducts";


const ItemListContainer = () => {
  const [itemProduct, setItemProduct] = useState([] as ItemProduct[]);
  const [itemsFilter, setItemsFilter] = useState([] as ItemProduct[]);

  const { productType = "" } = useParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const ac = new AbortController();
    setItemsFilter([]);
    setSearch("");
    let url: string = `http://localhost:7070/jdshop/products/active/${productType}`;

    const getListProducts = async () => {
      const products = GetActiveProducts(url);

      if (productType) {
        setItemProduct(await products);
      } else {
        setItemProduct(await products);
      }
    };

    getListProducts();

    return () => ac.abort(); // Abort both fetches on unmount
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

  const sectionImage = productType;

  return (
    <div className="section-products__wrapper-products">
      <NavigateBar />
      <ImageHero sectionImage={sectionImage} />
       
      <CarouselRaking />
      <div className="section-products__wrapper-input" id="section">
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
