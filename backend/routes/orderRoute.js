import express from "express"
import authMiddleware from "../middlewares/auth.js"
import { listOrders, placeOrder, updateOrder, userOrders, verifyOrder } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/user-orders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/update", updateOrder);

export default orderRouter;