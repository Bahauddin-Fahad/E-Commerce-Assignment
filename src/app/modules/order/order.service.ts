import { TOrder } from './order.interface';
import { ModelOrder } from './order.model';

const createOrderInDB = async (orderData: TOrder) => {
  const result = await ModelOrder.create(orderData);

  return result;
};
const getAllOrdersFromDB = async (email: string) => {
  if (email) {
    return await ModelOrder.find({ email });
  } else {
    return await ModelOrder.find();
  }
};

export const OrderServices = { createOrderInDB, getAllOrdersFromDB };
