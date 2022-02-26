import { existingQuantity } from "./ItemProduct"

export type ItemAdminProduct ={
    id: number;
    name: string;
    color: string;
    gender: string;
    brand: string;
    existingQuantity: existingQuantity[];
    picture: string;
    description: string;
    price: number;
    active:number
    
}