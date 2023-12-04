import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const Db_Connection = () => {
  mongoose
    .connect(process.env.MONGOURI)
    .then(() => {
      console.log("Connected to Db!");
    })
    .catch((err) => {
      console.log("Connection error:", err);
    });
};
