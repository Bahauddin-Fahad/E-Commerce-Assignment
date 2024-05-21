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
  if (!(await ModelProduct.doesProductExists(productId))) {
    return {
      success: false,
      message: 'Product not found',
    };
  }
  const result = await ModelProduct.findOneAndUpdate(
    { _id: productId },
    productData,
    { new: true },
  );
  return {
    success: true,
    message: 'Product updated successfully',
    data: result,
  };
};

const deleteProductFromDB = async (productId: string) => {
  if (!(await ModelProduct.doesProductExists(productId))) {
    return {
      success: false,
      message: 'Product not found',
    };
  }
  await ModelProduct.deleteOne({ _id: productId });
  return {
    success: true,
    message: 'Product deleted successfully',
  };
};

export const ProductServices = {
  addProductToDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductInDB,
  deleteProductFromDB,
};
