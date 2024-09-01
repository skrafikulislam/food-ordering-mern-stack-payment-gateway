import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const route = express.Router();

route.post("/add", authMiddleware, addToCart);
route.post("/remove", authMiddleware, removeFromCart);
route.post("/get", authMiddleware, getCart);

export default route;
