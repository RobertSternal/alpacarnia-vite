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
  /*bestSeller: {
    type: Boolean,
    required: true,
  },
  */
});

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;
