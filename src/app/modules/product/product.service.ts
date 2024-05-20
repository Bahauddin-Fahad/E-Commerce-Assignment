import { TProduct } from './product.interface';
import { ModelProduct } from './product.model';

const addProductToDB = async (productData: TProduct) => {
  // const product= ModelProduct.findOne({name: productData.name})
  const result = await ModelProduct.create(productData);
  return result;
};

const getAllProductsFromDB = async () => {
  const products = await ModelProduct.find();
  return products;
};
const getSingleProductFromDB = async (productId: string) => {
  const products = await ModelProduct.findOne({ _id: productId }).select(
    '-_id',
  );
  return products;
};
const updateSingleProductInDB = async (
  productId: string,
  productData: object,
) => {
  const products = await ModelProduct.updateOne(
    { _id: productId },
    productData,
  ).select('-_id');
  return products;
};
const deleteProductFromDB = async (productId: string) => {
  const result = await ModelProduct.deleteOne({ _id: productId });
  return result;
};

export const ProductServices = {
  addProductToDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductInDB,
  deleteProductFromDB,
};
