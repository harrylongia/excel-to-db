import express from "express";
import upload from "express-fileupload";
import { establishDatabase } from "./database.js";
import dotenv from "dotenv";
import baseRouter from "./routes/index.js"

const app = express();
app.use(express.json());
app.use(upload());
dotenv.config();

establishDatabase(process.env.MONGODB_URI).then((c) =>
  console.log("[MDB]", "Connected to", c.name)
);

app.use("/", baseRouter);

const PORT = process.env.PORT || "3000";
app.listen(PORT, () => {
  console.log(`Running in ${PORT ? "development" : "production"} environment`);
  console.log(`Listening on ${PORT}`);
});
