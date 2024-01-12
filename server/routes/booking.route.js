import express from "express";
import {
  addBooking,
  availableSlots,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.get("/available-slots/:date", availableSlots);
router.post("/add", addBooking);

export default router;
