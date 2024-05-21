import { z } from 'zod';

const orderZODSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  productId: z.string({ message: 'Invalid product ID format' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  quantity: z
    .number()
    .positive({ message: 'Quantity must be a positive number' }),
});

export default orderZODSchema;
