import type { Address } from "./Address";
import type { GeoPoint } from "./GeoPoint";

export interface StoreDTO {
    id: number;
    name: string;
    address: Address;
    location: GeoPoint;
    contactPhone: string;
    imageUrl?: string;
}

export const StoresKeysToNotDisplayInDetails = ["id", "contactPhone"]
