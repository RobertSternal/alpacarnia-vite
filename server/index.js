import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import bookingRouter from "./routes/booking.route.js";
import offerRouter from "./routes/offer.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:8081",
      "http://localhost:3000",
      "https://alpacarnia-vite-client.onrender.com",
      "https://alpacarnia-vite-server.onrender.com"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());

/*app.listen(3000, () => {
  console.log("Server is running on port 3000");
});*/
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/server/user", userRouter);
app.use("/server/auth", authRouter);
app.use("/server/booking", bookingRouter);
app.use("/server/offer", offerRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message,
  });
});
