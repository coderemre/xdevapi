import { Request, Response, RequestHandler } from "express";
import asyncHandler from "../utils/asyncHandler";
import { resError } from "../utils";

const dataControl: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next) => {
    if (req.body && Object.keys(req.body).length === 0) {
      return resError(res, "Eksik parametre!");
    } else {
      return next();
    }
  }
);

export default dataControl;
