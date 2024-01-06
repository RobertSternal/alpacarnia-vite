import express from "express";
import {
  oauth,
  signin,
  signout,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/oauth", oauth);
router.post("/signout", signout);

export default router;
