import Offer from "../models/offer.model.js";
import { errorHandler } from "../utils/error.js";

export const getAllOffers = async (req, res, next) => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (error) {
    next(error);
    console.log("error w getAll");
  }
};

export const addOffer = async (req, res, next) => {
  const { src, text, label, offer } = req.body;
  if (!src || !text || !label) {
    return next(errorHandler(401, "Wprowadzono nieprawidłowe dane"));
  }
  try {
    const newOffer = await Offer.create({ src, text, label, offer });
    res.status(201).json("Oferta została dodana");
  } catch (error) {
    next(error);
  }
};
