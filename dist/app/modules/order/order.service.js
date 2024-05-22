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
exports.OrderServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createOrderInDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.ModelProduct.doesProductExists(orderData.productId);
    if (!product) {
        return {
            success: false,
            message: 'Product not found',
        };
    }
    else {
        const requiredQuantity = orderData.quantity;
        const existingQuantity = product.inventory.quantity;
        if (existingQuantity < requiredQuantity) {
            return {
                success: false,
                message: 'Insufficient quantity available in inventory',
            };
        }
        else {
            const updatedQuantity = existingQuantity - requiredQuantity;
            if (updatedQuantity === 0) {
                yield product_model_1.ModelProduct.updateOne({ _id: orderData.productId }, { 'inventory.quantity': 0, 'inventory.inStock': false });
            }
            else {
                yield product_model_1.ModelProduct.updateOne({ _id: orderData.productId }, { 'inventory.quantity': updatedQuantity });
            }
        }
    }
    const result = yield order_model_1.ModelOrder.create(orderData);
    return {
        success: true,
        message: 'Order created successfully!',
        data: result,
    };
});
const getAllOrdersFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        return yield order_model_1.ModelOrder.find({ email });
    }
    else {
        return yield order_model_1.ModelOrder.find();
    }
});
exports.OrderServices = { createOrderInDB, getAllOrdersFromDB };
