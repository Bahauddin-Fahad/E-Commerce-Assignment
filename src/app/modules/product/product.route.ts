import express from 'express';
import { ProductControllers } from './product.controller';
const router = express.Router();

router
  .route('/')
  .post(ProductControllers.addProduct)
  .get(ProductControllers.getProducts);

router
  .route('/:productId')
  .get(ProductControllers.getSingleProduct)
  .put(ProductControllers.updateSingleProduct)
  .delete(ProductControllers.deleteProduct);
router.route('/?searchItem').get(ProductControllers.getProducts);
export const ProductRoutes = router;
