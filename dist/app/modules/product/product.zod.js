"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodValidation = void 0;
const zod_1 = require("zod");
// Define schema for product variant
const ProductVariantZodSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, 'Variant Type is required'),
    value: zod_1.z.string().min(1, 'Variant Value is required'),
});
// Define schema for product inventory
const ProductInventoryZodSchema = zod_1.z.object({
    quantity: zod_1.z.number().int().positive().min(1, 'Product Quantity is required'),
    inStock: zod_1.z.boolean().default(true),
});
// Define schema for product
const ProductZodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Product Name is required'),
    description: zod_1.z.string().min(1, 'Product Description is required'),
    price: zod_1.z.number().positive().min(1, 'Product Price is required'),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string().min(1, "Product Tag can't be blank")).nonempty(),
    variants: zod_1.z.array(ProductVariantZodSchema).nonempty(),
    inventory: ProductInventoryZodSchema.required(),
});
const ProductPartialZodSchema = ProductZodSchema.partial();
exports.zodValidation = {
    ProductZodSchema,
    ProductPartialZodSchema,
};
