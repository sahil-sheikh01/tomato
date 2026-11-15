import express from 'express'
import cors from 'cors'
import { connectDB } from './config/mongodb.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// Configuration
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// Api Endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/images", express.static('uploads'));
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter)

// GET Request
app.get("/", (req, res) => {
    res.send("Api Working...");
})

export default app;