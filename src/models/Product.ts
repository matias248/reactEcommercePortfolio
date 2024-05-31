export interface ProductDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    inventoryStatus: string;
    category: string;
    storeId:number
}

export const CategoryType = {
    Accessories: 'Accessories',
    Fitness: 'Fitness',
    Electronics: 'Electronics',
    Clothing: 'Clothing'
};

export const inventoryStatusType = {
    INSTOCK: 'INSTOCK',
    LOWSTOCK: 'LOWSTOCK',
    OUTOFSTOCK: 'OUTOFSTOCK'
};

export const arrayCategoryType = Object.values(CategoryType)

export const arrayInventoryStatusType = Object.values(inventoryStatusType)