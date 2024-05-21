import { Request, Response } from 'express';
import ProductZodSchema from './product.zod';
import { ProductServices } from './product.service';
import { ModelProduct } from './product.model';

const addProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const parsedproductData = ProductZodSchema.parse(productData);
    const result = await ProductServices.addProductToDB(parsedproductData);

    res.status(200).send({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Could not create product',
      error,
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchTerm: any = req.query.searchTerm;
    const products = await ProductServices.getAllProductsFromDB(searchTerm);

    if (products.length <= 0) {
      return res.status(200).send({
        success: false,
        message: 'Could not find any products',
      });
    }
    res.status(200).send({
      success: true,
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Could not fetch products',
      error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await ProductServices.getSingleProductFromDB(productId);
    if (product === null) {
      return res.status(404).send({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(200).send({
      success: true,
      message: 'Product fetched successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Could not fetch the product',
      error,
    });
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    if (!(await ModelProduct.doesProductExists(productId))) {
      return res.status(404).send({
        success: false,
        message: 'Product not found',
      });
    }
    const productData = req.body;
    const result = await ProductServices.updateSingleProductInDB(
      productId,
      productData,
    );

    res.status(200).send({
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Could not update the product',
      error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    if (!(await ModelProduct.doesProductExists(productId))) {
      return res.status(404).send({
        success: false,
        message: 'Product not found',
      });
    }
    await ProductServices.deleteProductFromDB(productId);
    res.status(200).send({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Could not delete the product',
      error,
    });
  }
};

export const ProductControllers = {
  addProduct,
  getProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteProduct,
};
