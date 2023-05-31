import { Router, Request, Response } from "express";
import { asyncHandler, resJson, resError } from "../utils";

const router = Router();

router.get(
  "/:collection",
  asyncHandler(async (req: Request, res: Response, next) => {
    const db = require("../database/db");
    const collection = req.params.collection;
    const data: any = req.query;

    const [session, schema] = await db.getInstance("DBName");

    try {
      const myColl = schema.getCollection(collection);
      let condition;
      let condition_value;
      let limit = 999999999999999;

      let sort = [];
      let offset = 0;
      let numberCondition = data.numberCondition || false;
      let find = {};
      let fields: any = [];
      let result: any = [];

      if (data && Object.keys(data).length !== 0) {
        data.fields && (fields = data.fields);
        data.sort && (sort = data.sort);
        data.limit && (limit = parseInt(data.limit));
        data.where && (find = data.where);

        if (data.condition) {
          condition = data.condition;
          condition_value = data[condition];
          if (condition_value) {
            !numberCondition && (condition_value = "'" + condition_value + "'");
            find = condition + " = " + condition_value;
          }
        }
      }
      const resDB = await myColl
        .find(find)
        .fields(fields)
        .sort(sort)
        .limit(limit)
        .offset(offset)
        .execute();

      result.data = resDB.fetchAll();
      resJson(res, result);
      session.close();
      return next();
    } catch (error) {
      console.log("#### Items get line ####");
      console.log(error);
      resError(res, error);
      session.close();
      return next();
    }
  })
);

export default router;
