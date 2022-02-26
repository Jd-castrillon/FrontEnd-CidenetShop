import { newExistingQuantity } from "../types/NewExtingQuantity"

const CreateStock = async (idProduct: number, shortText: string, quantity: number, token: string) => {

    const url: string = "http://localhost:7070/jdshop/existingQuantity"

    const newExistingQuantity: newExistingQuantity = {
        idProduct: idProduct,
        shortText: shortText,
        quantity: quantity
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify(newExistingQuantity)
    }).then((results) => results.json())

    return response;



}

export default CreateStock