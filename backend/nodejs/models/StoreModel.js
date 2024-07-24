import mongoose from 'mongoose';
import z from 'zod';
import { ProductSchemaZod } from './ProductModel.js'

const LocationSchemaZod = z.object({ latitude: z.number(), longitude: z.number() });
const AddressSchemaZod = z.object(
  {
    streetNumber: z.string(),
    streetName: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
  });

const StoreSchemaZod = z.object({
  id: z.number(),
  name: z.string(),
  location: LocationSchemaZod,
  address: AddressSchemaZod,
  contactPhone: z.string(),
  imageUrl: z.string().optional(),
});

export function validateStore(input) {
  return StoreSchemaZod.safeParse(input)
}

export function validatePartialStore(input) {
  return StoreSchemaZod.partial().safeParse(input)
}

const AddressSchema = new mongoose.Schema(
  { streetNumber: String, streetName: String, city: String, state: String, zipCode: String }, { _id: 0 });

const LocationSchema = new mongoose.Schema({ latitude: Number, longitude: Number }, { _id: 0 });

const StoreSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: undefined
  },
  location: {
    type: LocationSchema,
    default: undefined,
    required: true

  },
  address: {
    type: AddressSchema,
    default: undefined,
    required: true
  }
}, { versionKey: false });



export const StoreModel = mongoose.model("StoreReactApp", StoreSchema)

export async function getNextSequentialId() {
  const lastStore = await StoreModel.findOne().sort({ id: -1 });
  const lastId = lastStore ? lastStore.id : 0;
  return lastId + 1;
}
