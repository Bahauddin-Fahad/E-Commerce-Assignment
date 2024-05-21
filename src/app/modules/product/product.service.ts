import { TProduct } from './product.interface';
import { ModelProduct } from './product.model';

const addProductToDB = async (productData: TProduct) => {
  const result = await ModelProduct.create(productData);
  return result;
};

const getAllProductsFromDB = async (searchTerm?: string) => {
  if (searchTerm) {
    return await ModelProduct.find({ $text: { $search: searchTerm } });
  } else {
    return await ModelProduct.find();
  }
};

const getSingleProductFromDB = async (productId: string) => {
  const product = ModelProduct.doesProductExists(productId);
  return product;
};

const updateSingleProductInDB = async (
  productId: string,
  productData: object,
) => {
  const result = await ModelProduct.findOneAndUpdate(
    { _id: productId },
    productData,
    { new: true },
  );

  return result;
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
