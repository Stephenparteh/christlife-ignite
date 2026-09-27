import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ApiError } from "./ApiError";

/** Rejects with a clean 400 instead of letting an invalid :id reach Mongoose as a cast error. */
export const requireValidObjectId = (paramName = "id") =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
      return next(new ApiError(400, "Invalid id."));
    }
    next();
  };
