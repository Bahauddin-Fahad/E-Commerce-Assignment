import { Model } from 'mongoose';

export type TProductVariant = { type: string; value: string };
export type TProductInventory = { quantity: number; inStock: boolean };

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TProductVariant[];
  inventory: TProductInventory;
};

//Create Static Method
export interface ProductModel extends Model<TProduct> {
  // eslint-disable-next-line no-unused-vars
  doesProductExists(id: string): Promise<TProduct | null>;
}
