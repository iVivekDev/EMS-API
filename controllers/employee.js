import { createError, createSuccess } from "../middleware/response.js";
import Employee from "../models/employee.js";
import bcrypt from "bcryptjs";

// Create Employee

export const AddEmployee = async (req, res, next) => {
  const { employeePassword, ...empData } = req.body;
  try {
    const existingEmployee = await Employee.findOne({
      employeeEmail: empData.employeeEmail,
    });

    if (existingEmployee) {
      return res
        .status(400)
        .json(createError("Employee with this email already exists"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(employeePassword, salt);
    const newEmployee = new Employee({
      ...empData,
      employeePassword: hash,
    });

    await newEmployee.save();
    res
      .status(200)
      .json(createSuccess("Employee Save Successful", newEmployee));
  } catch (error) {
    next(error);
  }
};

// Get all employee

export const GetAllEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.find({});
    if (employee.length > 0) {
      res.status(200).json(createSuccess("Successful", employee));
    } else {
      res.status(200).json(createError("No data found"));
    }
  } catch (error) {
    next(error);
  }
};
