import { Request, Response } from 'express';
import ProductZodSchema from './product.zod';
import { ProductServices } from './product.service';

const addProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const productParsedData = ProductZodSchema.parse(productData);
    const result = await ProductServices.addProductToDB(productParsedData);

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
    const searchTerm: any = req.query.searchTerm;
    const products = await ProductServices.getAllProductsFromDB(searchTerm);
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
    const result = await ProductServices.deleteProductFromDB(productId);
    res.status(200).send({
      success: true,
      message: 'Product deleted successfully',
      data: result,
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
