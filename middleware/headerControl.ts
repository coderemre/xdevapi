import { Request, Response, RequestHandler } from "express";
import dotenv from "dotenv";
import asyncHandler from "../utils/asyncHandler";
// import { resError } from "../utils";

dotenv.config();

const headerControl: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next) => {
    return next();
    // console.log(req.headers.origin);
    // if (!req.headers.origin || req.headers.origin === undefined) {
    //   const token = process.env.TOKEN;
    //   if (req.headers.token == token) {
    //     return next();
    //   } else {
    //     return resError(res, "Unauthorized");
    //   }
    // } else {
    //   return next();
    // }
  }
);

export default headerControl;
