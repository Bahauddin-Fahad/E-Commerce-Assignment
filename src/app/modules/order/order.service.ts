import { ModelProduct } from '../product/product.model';
import { TOrder } from './order.interface';
import { ModelOrder } from './order.model';

const createOrderInDB = async (orderData: TOrder) => {
  const product = await ModelProduct.doesProductExists(orderData.productId);
  if (!product) {
    return {
      success: false,
      message: 'Product not found',
    };
  } else {
    const requiredQuantity = orderData.quantity;
    const existingQuantity = product.inventory.quantity;
    if (existingQuantity < requiredQuantity) {
      return {
        success: false,
        message: 'Insufficient quantity available in inventory',
      };
    } else {
      const updatedQuantity = existingQuantity - requiredQuantity;
      if (updatedQuantity === 0) {
        await ModelProduct.updateOne(
          { _id: orderData.productId },
          { 'inventory.quantity': 0, 'inventory.inStock': false },
        );
      } else {
        await ModelProduct.updateOne(
          { _id: orderData.productId },
          { 'inventory.quantity': updatedQuantity },
        );
      }
    }
  }
  const result = await ModelOrder.create(orderData);

  return {
    success: true,
    message: 'Order created successfully!',
    data: result,
  };
};
const getAllOrdersFromDB = async (email: string) => {
  if (email) {
    return await ModelOrder.find({ email });
  } else {
    return await ModelOrder.find();
  }
};

export const OrderServices = { createOrderInDB, getAllOrdersFromDB };
