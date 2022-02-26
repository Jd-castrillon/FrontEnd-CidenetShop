import { ItemAdminProduct } from "../types/ItemAdminProduct";

export const getProducts = async (url: string, token: string): Promise<ItemAdminProduct[]> => {
  const res = await fetch(url, {
    headers: {

      Authorization: `Bearer ${token}`,
    }
  }).then((res) => res.json());

  return res;
};
