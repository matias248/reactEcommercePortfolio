import { StoreDTO } from "../models/Store";
import { currentProducts } from "./Products";

export const currentStores:StoreDTO[] =[
    {
        id: 1,
        name: "Simple Store",
        address: {
            streetNumber:"0",
            streetName:"Street Name",
            city:"Simple City D.C",
            state:"Simple Country",
            zipCode:"31000",
        },
        location: {
            latitude:1,
            longitude:2,
        },
        contactPhone: "+33 123456",
        produtcs: currentProducts,
        imageUrl:"/store1.jpeg"
    },
    {
        id: 2,
        name: "Neo store",
        address: {
            streetNumber:"0",
            streetName:"Street Name",
            city:"Neo City",
            state:"Neo Country",
            zipCode:"31000",
        },
        location: {
            latitude:1,
            longitude:2,
        },
        contactPhone: "+33 123456",
        produtcs: [],
        imageUrl:"/store2.jpeg"
    },
    
]
