

import {  ItemProduct } from "../types/ItemProduct"

export const findFirstSize = (item: ItemProduct) => {
    
    const size = item.existingQuantity.find( x => x.sizeShortText[0])
    if (size !== undefined) {
        
        return size
    }
}
