

export type existingQuantity = {
    idSize:number;
    sizeShortText:string;
    existingQuantity:number; 
}

export type ItemProduct = {

    id: number;
    name: string;
    color: string;
    gender: string;
    brand: string;
    existingQuantity: existingQuantity[];
    picture: string;
    description: string;
    price: number;
    amount : number;
    size: string;
    
}

export type OrderDetails={
    idProduct:number,
    size: string,
    quantity:number

}   

export type Order = {

    orderAddress : string
   orderDetails: OrderDetails[]

} 
