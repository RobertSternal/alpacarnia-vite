import express from "express";
import { verifyAdmin } from "../utils/verify.js";
import { addOffer, getAllOffers } from "../controllers/offer.controller.js";

const router = express.Router();

router.get("/admin/management", verifyAdmin, getAllOffers);
router.post("/add", verifyAdmin, addOffer);

export default router;
