import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  amountPeople: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    minLength: [9],
    maxLength: [11],
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
