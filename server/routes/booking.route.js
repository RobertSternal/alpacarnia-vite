import express from "express";
import { addBooking } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/add", addBooking);

export default router;
