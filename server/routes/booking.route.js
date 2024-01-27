import express from "express";
import {
  addBooking,
  availableSlots,
  getUserBookings,
} from "../controllers/booking.controller.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.get("/user/:id", verifyToken, getUserBookings);
router.get("/available-slots/:date", availableSlots);
router.post("/add", verifyToken, addBooking);

export default router;
