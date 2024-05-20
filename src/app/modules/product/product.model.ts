import { Schema, model } from 'mongoose';
import {
  TProduct,
  TProductInventory,
  TProductVariant,
} from './product.interface';

const productVariantSchema = new Schema<TProductVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});
const productInventorySchema = new Schema<TProductInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true, default: true },
});
const productSchema = new Schema<TProduct>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [productVariantSchema], required: true },
  inventory: { type: productInventorySchema, required: true },
});

export const ModelProduct = model<TProduct>('Product', productSchema);
