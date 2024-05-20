import { z } from 'zod';

// Define schema for product variant
const ProductVariantZodSchema = z.object({
  type: z.string().min(1, 'Variant Type is required'),
  value: z.string().min(1, 'Variant Value is required'),
});

// Define schema for product inventory
const ProductInventoryZodSchema = z.object({
  quantity: z.number().int().positive().min(1, 'Product Quantity is required'),
  inStock: z.boolean().default(true),
});

// Define schema for product
const ProductZodSchema = z.object({
  name: z.string().min(1, 'Product Name is required'),
  description: z.string().min(1, 'Product Description is required'),
  price: z.number().positive().min(1, 'Product Price is required'),
  category: z.string(),
  tags: z.array(z.string().min(1, "Product Tag can't be blank")).nonempty(),
  variants: z.array(ProductVariantZodSchema).nonempty(),
  inventory: ProductInventoryZodSchema.required(),
});

export default ProductZodSchema;
