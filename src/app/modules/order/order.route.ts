import express from 'express';
import { OrderControllers } from './order.controller';
const router = express.Router();

router
  .route('/')
  .post(OrderControllers.createOrder)
  .get(OrderControllers.getAllOrders);

export const OrderRoutes = router;
