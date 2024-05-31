import { StoreDTO } from "../models/Store";
import { currentProducts } from "./Products";

export const currentStores:StoreDTO[] =[
    {
        id: 1,
        name: "Toulouse store",
        currency: "EUR",
        address: {
            streetNumber:"0",
            streetName:"Street Name",
            city:"City",
            state:"State",
            zipCode:"31000",
        },
        location: {
            latitude:1,
            longitude:2,
        },
        contactPhone: "+33 123456",
        produtcs: currentProducts,
        imageUrl:"https://img.freepik.com/vector-premium/fachada-tienda-plana-toldo_23-2147542588.jpg"
    },
    {
        id: 2,
        name: "Toulouse store 2",
        currency: "EUR",
        address: {
            streetNumber:"0",
            streetName:"Street Name",
            city:"City",
            state:"State",
            zipCode:"31000",
        },
        location: {
            latitude:1,
            longitude:2,
        },
        contactPhone: "+33 123456",
        produtcs: [],
        imageUrl:"https://img.freepik.com/vector-premium/fachada-tienda-plana-toldo_23-2147542588.jpg"
    },
    
]
