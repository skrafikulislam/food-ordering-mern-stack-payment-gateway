import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import dotenv from "dotenv";

//app config
const app = express();
const port = 5000;

//middleware
app.use(express.json());
app.use(cors());
dotenv.config();

// db connection
connectDb();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.listen(process.env.Port || port, () => {
  console.log(`Server running on port ${process.env.Port || port}`);
});
