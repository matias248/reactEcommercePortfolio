import mongoose from 'mongoose';
import z from 'zod';

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

export const currencyType = {
  EUR: '€',
  DOLLAR: '$',
  STERLING: '£'
};

export const arrayCategoryType = Object.values(CategoryType)

export const arrayInventoryStatusType = Object.values(inventoryStatusType)

export const arrayCurrencyType = Object.values(currencyType)

export const ProductSchemaZod = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  inventoryStatus: z.enum(arrayInventoryStatusType),
  category: z.enum(arrayCategoryType),
  imageUrl: z.string().optional(),
  storeId: z.number(),
  currency: z.enum(arrayCurrencyType),
});

export function validateProduct(input) {
  return ProductSchemaZod.safeParse(input)
}

export function validatePartialProduct(input) {
  return ProductSchemaZod.partial().safeParse(input)
}

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  inventoryStatus: {
    type: String,
    enum: arrayInventoryStatusType,
    required: true
  },
  category: {
    type: String,
    enum: arrayCategoryType,
    required: true
  },
  imageUrl: {
    type: String,
    default: undefined,
  },
  storeName: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    enum: arrayCurrencyType,
    required: true
  },
  storeId: { type: Number, required: true }
}, { versionKey: false });



export const ProductModel = mongoose.model("ProductReactApp", ProductSchema)

export async function getNextSequentialId() {
  const lastProduct = await ProductModel.findOne().sort({ id: -1 });
  const lastId = lastProduct ? lastProduct.id : 0;
  return lastId + 1;
}

export function getNextId(array) {
  let i = 1;
  while (i <= array.length + 1 && array.some((element) => { return element.id === i })) {
    i++;
  }
  return i;
}
