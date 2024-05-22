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
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const addProductToDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ModelProduct.create(productData);
    return result;
});
const getAllProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    if (searchTerm) {
        return yield product_model_1.ModelProduct.find({ $text: { $search: searchTerm } });
    }
    else {
        return yield product_model_1.ModelProduct.find();
    }
});
const getSingleProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = product_model_1.ModelProduct.doesProductExists(productId);
    return product;
});
const updateSingleProductInDB = (productId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield product_model_1.ModelProduct.doesProductExists(productId))) {
        return {
            success: false,
            message: 'Product not found',
        };
    }
    const result = yield product_model_1.ModelProduct.findOneAndUpdate({ _id: productId }, productData, { new: true });
    return {
        success: true,
        message: 'Product updated successfully',
        data: result,
    };
});
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield product_model_1.ModelProduct.doesProductExists(productId))) {
        return {
            success: false,
            message: 'Product not found',
        };
    }
    yield product_model_1.ModelProduct.deleteOne({ _id: productId });
    return {
        success: true,
        message: 'Product deleted successfully',
    };
});
exports.ProductServices = {
    addProductToDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateSingleProductInDB,
    deleteProductFromDB,
};
