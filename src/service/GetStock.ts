import { existingQuantity } from "../types/ItemProduct";

const GetStock = async (idProduct: number, token: string): Promise<existingQuantity[]> => {

    const url: string = `http://localhost:7070/jdshop/existingQuantity/${idProduct}`

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: token,
        }
    }).then((results) => results.json())

    return response;


}

export default GetStock