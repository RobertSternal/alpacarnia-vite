import { errorHandler } from "../utils/error.js";
import Booking from "../models/booking.model.js";

export const addBooking = async (req, res, next) => {
  const { firstName, lastName, amountPeople, email, phone, date, time } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !amountPeople ||
    !email ||
    !phone ||
    !date ||
    !time
  ) {
    return next(errorHandler(401, "Wprowadzono nieprawidłowe dane"));
  }
  try {
    const newBooking = await Booking.create({
      firstName,
      lastName,
      amountPeople,
      email,
      phone,
      date,
      time,
    });
    res.status(201).json("Rezerwacja została pomyślnie złożona");
  } catch (error) {
    if (error.code === 11000) {
      return next(errorHandler(400, "Wybrany termin jest już zajęty"));
    }
    next(error);
  }
};

export const availableSlots = async (req, res, next) => {
  try {
    const date = req.params.date;
    const bookedSlots = await Booking.find({ date }).select("time -_id");

    // Logic to determine available slots based on bookedSlots
    const allSlots = [
      "9:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
    ];
    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.some((booked) => booked.time === slot)
    );
    res.json({ availableSlots });
  } catch (error) {
    next(error);
  }
};
