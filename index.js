import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Db_Connection } from "./middleware/Connection.js";
import Employee_Route from "./routes/employee.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Api is Live");
});

app.use("/api", Employee_Route);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8800, () => {
  Db_Connection();
  console.log("Connected to server");
});
