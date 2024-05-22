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
exports.ModelProduct = void 0;
const mongoose_1 = require("mongoose");
const productVariantSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    value: { type: String, required: true },
});
const productInventorySchema = new mongoose_1.Schema({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true, default: true },
});
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [productVariantSchema], required: true },
    inventory: { type: productInventorySchema, required: true },
});
productSchema.statics.doesProductExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingProduct = yield exports.ModelProduct.findOne({ _id: id });
        return existingProduct;
    });
};
productSchema.index({
    name: 'text',
    description: 'text',
    category: 'text',
});
exports.ModelProduct = (0, mongoose_1.model)('Product', productSchema);
