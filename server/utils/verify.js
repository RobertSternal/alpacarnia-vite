import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(req.cookies);
  //console.log(token);
  if (!token) return next(errorHandler(401, "Nieautoryzowany dostęp"));
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return next(errorHandler(403, "Niedozwolony token"));

    req.user = user;
    next();
  });
};
