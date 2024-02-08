import express from "express";
import { verifyAdmin } from "../utils/verify.js";
import {
  addOffer,
  deleteOffer,
  editOffer,
  getAllOffers,
} from "../controllers/offer.controller.js";

const router = express.Router();

router.get("/public", getAllOffers);
router.get("/admin/management", verifyAdmin, getAllOffers);
router.post("/add", verifyAdmin, addOffer);
router.put("/edit/:id", verifyAdmin, editOffer);
router.delete("/delete/:id", verifyAdmin, deleteOffer);

export default router;
