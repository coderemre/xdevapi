import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import itemsRouter from "./controllers/items";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "PATCH"],
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/items", itemsRouter);

app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
