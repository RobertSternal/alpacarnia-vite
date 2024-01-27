import express from "express";
import {
  addBooking,
  availableSlots,
  getUserBookings,
} from "../controllers/booking.controller.js";

const router = express.Router();
router.get("*", (req, res) => {
  res.send("xddd");
});
router.get("/user/:id", getUserBookings);
router.get("/available-slots/:date", availableSlots);
router.post("/add", addBooking);

export default router;
