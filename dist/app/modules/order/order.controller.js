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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_zod_1 = __importDefault(require("./order.zod"));
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const parsedOrderData = order_zod_1.default.parse(orderData);
        const result = yield order_service_1.OrderServices.createOrderInDB(parsedOrderData);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'Could not create the order',
            error,
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const email = req.query.email;
        const orders = yield order_service_1.OrderServices.getAllOrdersFromDB(email);
        res.status(200).send({
            success: true,
            message: 'Orders fetched successfully!',
            data: orders,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'Could not fetch the orders',
            error,
        });
    }
});
exports.OrderControllers = { createOrder, getAllOrders };
