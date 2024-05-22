"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router
    .route('/')
    .post(product_controller_1.ProductControllers.addProduct)
    .get(product_controller_1.ProductControllers.getProducts);
router
    .route('/:productId')
    .get(product_controller_1.ProductControllers.getSingleProduct)
    .put(product_controller_1.ProductControllers.updateSingleProduct)
    .delete(product_controller_1.ProductControllers.deleteProduct);
exports.ProductRoutes = router;
