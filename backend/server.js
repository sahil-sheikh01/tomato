import express from 'express'
import cors from 'cors'
import { connectDB } from './config/mongodb.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config.js'
import cartRouter from './routes/cartRoute.js';

// Configuration
const app = express();
const port = 4000;

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

// GET Request
app.get("/", (req, res) => {
    res.send("Api Working...");
})

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})