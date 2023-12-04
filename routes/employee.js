import express from "express";
import { AddEmployee, GetAllEmployee } from "../controllers/employee.js";

const router = express.Router();

router.post("/addemployee", AddEmployee);
router.get("/getemployee", GetAllEmployee);

export default router;
