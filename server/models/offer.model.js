import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  offer: {
    type: String,
    required: true,
  },
  description1: {
    type: String,
  },
  description2: {
    type: String,
  },
  description3: {
    type: String,
  },
  bestSeller: {
    type: Boolean,
  },
  pack: {
    type: Object,
  },
});

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;
