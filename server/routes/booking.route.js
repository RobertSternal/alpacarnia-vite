import express from "express";
import {
  addBooking,
  availableSlots,
  getAllBookings,
  getUserBookings,
} from "../controllers/booking.controller.js";
import { verifyAdmin, verifyToken } from "../utils/verify.js";

const router = express.Router();

router.get("/admin/dashboard", verifyAdmin, getAllBookings);
router.get("/user/:id", verifyToken, getUserBookings);
router.get("/available-slots/:date", availableSlots);
router.post("/add", addBooking);

export default router;
