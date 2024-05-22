"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_zod_1 = require("./product.zod");
const product_service_1 = require("./product.service");
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const parsedproductData = product_zod_1.zodValidation.ProductZodSchema.parse(productData);
        const result = yield product_service_1.ProductServices.addProductToDB(parsedproductData);
        res.status(200).send({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'Could not create product',
            error,
        });
    }
});
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const searchTerm = req.query.searchTerm;
        const products = yield product_service_1.ProductServices.getAllProductsFromDB(searchTerm);
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
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'Could not fetch products',
            error,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
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
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'Could not fetch the product',
            error,
        });
    }
});
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const productData = req.body;
        const parsedProductData = product_zod_1.zodValidation.ProductPartialZodSchema.parse(productData);
        const result = yield product_service_1.ProductServices.updateSingleProductInDB(productId, parsedProductData);
        res.status(200).send(result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'Could not update the product',
            error,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.deleteProductFromDB(productId);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'Could not delete the product',
            error,
        });
    }
});
exports.ProductControllers = {
    addProduct,
    getProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteProduct,
};
