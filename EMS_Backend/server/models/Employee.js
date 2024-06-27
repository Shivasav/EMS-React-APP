const mongoose = require("mongoose");

const allowedTitles = ["Employee", "Manager", "Director", "VP"];
const allowedDepartments = ["IT", "Marketing", "HR", "Engineering"];
const allowedEmployeeTypes = ["Full Time", "Part Time", "Contract", "Seasonal"];

const employeeSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Age: { type: Number, required: true },
  DateOfJoining: { type: Date, required: true },
  Title: { type: String, enum: allowedTitles, required: true },
  Department: { type: String, enum: allowedDepartments, required: true },
  EmployeeType: { type: String, enum: allowedEmployeeTypes, required: true },
  currentStatus: { type: Boolean, default: true },
});

module.exports = mongoose.model("Employee", employeeSchema);
