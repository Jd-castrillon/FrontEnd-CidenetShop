import { ItemProduct } from "../types/ItemProduct";

export const getProducts = async (url: string): Promise<ItemProduct[]> => {
  const res = await fetch(url).then((res) => res.json());

  return res;
};
