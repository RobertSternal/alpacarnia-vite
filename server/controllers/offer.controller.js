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
  const {
    src,
    text,
    label,
    offer,
    description1,
    description2,
    description3,
    bestSeller,
  } = req.body;
  if (!src || !text || !label || !description1) {
    return next(errorHandler(401, "Wprowadzono nieprawidłowe dane"));
  }
  try {
    const newOffer = await Offer.create({
      src,
      text,
      label,
      offer,
      description1,
      description2,
      description3,
      bestSeller,
    });
    res.status(201).json("Oferta została dodana");
  } catch (error) {
    next(error);
  }
};

export const editOffer = async (req, res, next) => {
  const offerId = req.params.id;
  const {
    src,
    text,
    label,
    offer,
    description1,
    description2,
    description3,
    bestSeller,
  } = req.body;

  if (!src || !text || !label || !description1) {
    console.error("Error: Invalid data provided for offer update");
    return next(errorHandler(401, "Wprowadzono nieprawidłowe dane"));
  }

  try {
    const existingOffer = await Offer.findById(offerId);

    if (!existingOffer) {
      console.error("Error: Offer not found with the provided ID");
      return next(errorHandler(404, "Oferta nie znaleziona"));
    }

    const updatedOffer = await Offer.findByIdAndUpdate(offerId, {
      src,
      text,
      label,
      offer,
      description1,
      description2,
      description3,
      bestSeller,
    });
    if (!updatedOffer) {
      return next(errorHandler(404, "Oferta nie znaleziona"));
    }

    res.status(200).json("Oferta została zaktualizowana");
  } catch (error) {
    next(error);
  }
};

export const deleteOffer = async (req, res, next) => {
  const offerId = req.params.id;

  try {
    const deletedOffer = await Offer.findByIdAndDelete(offerId);

    if (!deletedOffer) {
      return next(errorHandler(404, "Oferta nie znaleziona"));
    }

    res.status(200).json("Oferta została usunięta");
  } catch (error) {
    next(error);
  }
};
