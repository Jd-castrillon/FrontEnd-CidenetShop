import { newExistingQuantity } from "../types/NewExtingQuantity"

const UpdateStock = async (idProduct: number, shortText: string, quantity: any, token: string) => {

    const newExistingQuantity: newExistingQuantity = {
        idProduct: idProduct,
        shortText: shortText,
        quantity: quantity
    }

    const url: string = `http://localhost:7070/jdshop/existingQuantity/${idProduct}`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
             "Content-Type": "application/json",
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newExistingQuantity)
    }).then((results) => results.json())

    return response;


}

export default UpdateStock