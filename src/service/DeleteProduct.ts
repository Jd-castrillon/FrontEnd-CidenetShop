
import { ItemAdminProduct } from "../types/ItemAdminProduct";

export const DeleteProduct = async (item: ItemAdminProduct, token: string) => {
    const url = `http://localhost:7070/jdshop/products/${item.id}`
    const response = await fetch(url, {
        method: "DELETE",
        headers: {

            Authorization: token,
        }

    }).then((results) => results.json());

    return response
}