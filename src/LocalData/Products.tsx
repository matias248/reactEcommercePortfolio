import { ProductDTO } from "../models/Product";

export const currentProducts: ProductDTO[] = [
  {
    "id": 1,
    "name": "Simple Watch",
    "description": "Embrace timeless sophistication with the Simple Watch, a fusion of classic design and modern functionality. Crafted from stainless steel and sapphire crystal.",
    "imageUrl": process.env.PUBLIC_URL+"/watch.jpeg",
    "price": 65,
    "category": "Accessories",
    "inventoryStatus": "INSTOCK",
    "storeId": 1,
    "currency": "€"
  },
  {
    "id": 2,
    "name": "Simple Shirt",
    "description": "Discover effortless style with the Simple Shirt, tailored for comfort and versatility. Made from breathable cotton fabric, this shirt is perfect for daily wear and casual outings. Its classic fit and subtle patterns effortlessly complement any wardrobe.",
    "imageUrl": process.env.PUBLIC_URL+"/shirt.jpeg",
    "price": 72,
    "category": "Clothing",
    "inventoryStatus": "INSTOCK",
    "storeId": 1,
    "currency": "€"
  }, {
    "id": 3,
    "name": "Neo Shirt",
    "description": "Discover effortless style with the Neo Shirt, tailored for comfort and versatility. Made from breathable cotton fabric, this shirt is perfect for daily wear and casual outings. Its classic fit and subtle patterns effortlessly complement any wardrobe.",
    "imageUrl": process.env.PUBLIC_URL+"/shirt.jpeg",
    "price": 72,
    "category": "Clothing",
    "inventoryStatus": "INSTOCK",
    "storeId": 2,
    "currency": "€"
  },
]
