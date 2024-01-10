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
    next(error);
  }
};
