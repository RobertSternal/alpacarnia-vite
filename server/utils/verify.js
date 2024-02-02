import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import User from "../models/user.model.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "Nieautoryzowany dostęp"));
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return next(errorHandler(403, "Niedozwolony token"));

    req.user = user;
    next();
  });
};

export const verifyAdmin = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      // req.user should be set by verifyToken
      if (!req.user) throw new Error("User not found in request");

      const user = await User.findById(req.user.id);
      if (!user) throw new Error("Nie znaleziono użytkownika");

      if (!user.isAdmin) {
        return next(
          errorHandler(403, "Odmowa dostępu: Tylko dla administracji")
        );
      }
      next();
    } catch (err) {
      return next(errorHandler(500, err.message));
    }
  });
};
