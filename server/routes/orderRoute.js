import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  listOrders,
  placeOrder,
  updateOrderStatus,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";

const route = express.Router();

route.post("/place", authMiddleware, placeOrder);
route.post("/verify", verifyOrder);
route.post("/userorders", authMiddleware, userOrders);
route.get("/list", listOrders);
route.post("/status", updateOrderStatus);

export default route;
