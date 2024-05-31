import { Address } from "./Address";
import { GeoPoint } from "./GeoPoint";
import { ProductDTO } from "./Product";

export interface StoreDTO {
    id: number;
    name: string;
    currency: string;
    address: Address;
    location: GeoPoint;
    contactPhone: string;
    produtcs?: Array<ProductDTO>;
    imageUrl?: string;

}

