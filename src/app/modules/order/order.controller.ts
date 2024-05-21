import { Request, Response } from 'express';
import orderZODSchema from './order.zod';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const parsedOrderData = orderZODSchema.parse(orderData);
    const result = await OrderServices.createOrderInDB(parsedOrderData);

    res.status(200).send({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Could not create the order',
      error,
    });
  }
};
const getAllOrders = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const email: any = req.query.email;
    const orders = await OrderServices.getAllOrdersFromDB(email);

    res.status(200).send({
      success: true,
      message: 'Orders fetched successfully!',
      data: orders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Could not fetch the orders',
      error,
    });
  }
};
export const OrderControllers = { createOrder, getAllOrders };
