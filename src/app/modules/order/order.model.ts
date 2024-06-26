import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const ModelOrder = model<TOrder>('Order', orderSchema);
