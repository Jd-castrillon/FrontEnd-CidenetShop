import { OrderDetails } from "../types/ItemProduct";

const QueryOutOfStock = async(orderDetails: OrderDetails[], token:string) => {


    const response = await fetch("http://localhost:7070/jdshop/orderdetails/outofstock", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            Authorization: token,
        },

        body: JSON.stringify(orderDetails),
    }).then((results) => results.json());

    return response


};

export default QueryOutOfStock;
