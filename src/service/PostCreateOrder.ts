import { Order } from "../types/ItemProduct";




export const PostCreateOrder = async (order: Order, token: string) => {



    const response = await fetch("http://localhost:7070/jdshop/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            Authorization: token,
        },

        body: JSON.stringify(order),
    }).then((results) => results.json());

    return response
}