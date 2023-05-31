/**
 * Check if requested collection exists, and save it to req.collection
 */

import { Request, Response, RequestHandler } from "express";
import { resJson } from "../utils";
import asyncHandler from "../utils/asyncHandler";

const customCollectionsData = ["users"];

const customCollections: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next) => {
    if (customCollectionsData.includes(req.params.collection)) {
      await resJson(res, null);
    } else {
      return next();
    }
  }
);

export default customCollections;
