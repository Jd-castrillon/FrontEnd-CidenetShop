
import { DeleteStockType } from '../types/DeleteStockType'

const DeleteStock = async (idProduct: number, shortText: string, token: string) => {

    const deleteStock: DeleteStockType = {
        idProduct: idProduct,
        shortText: shortText
    }

    const url: string = "http://localhost:7070/jdshop/existingQuantity"

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify(deleteStock)
    }).then((results) => results.json())

    return response
  
}

export default DeleteStock