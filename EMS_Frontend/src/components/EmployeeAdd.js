import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EMPLOYEE } from "../mutations/employeeMutation";

const EmployeeAdd = () => {
  const [newEmployee, setNewEmployee] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
    DateOfJoining: "",
    Title: "",
    Department: "",
    EmployeeType: "",
    currentStatus: true,
  });
  const [errorAge, setErrorAge] = useState("");

  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    variables: {
      FirstName: newEmployee.FirstName,
      LastName: newEmployee.LastName,
      Age: parseInt(newEmployee.Age),
      DateOfJoining: newEmployee.DateOfJoining,
      Title: newEmployee.Title,
      Department: newEmployee.Department,
      EmployeeType: newEmployee.EmployeeType,
      currentStatus: newEmployee.currentStatus,
    },
    onCompleted: (newValue) => {
      setNewEmployee((currEmployee) => ({
        ...currEmployee,
        id: newValue.addEmployee.id,
      }));
    },
  });

  const validateAge = (Age) => {
    return Age >= 20 && Age <= 70;
  };

  const onAddEmployee = async (e) => {
    e.preventDefault();
    if (!validateAge(newEmployee.Age)) {
      setErrorAge("Invalid Age! Age must be between 20 and 70");
      return;
    }
    try {
      await addEmployee();

      alert("Employee added successfully!");

      window.location.reload();

      setNewEmployee({
        FirstName: "",
        LastName: "",
        Age: "",
        DateOfJoining: "",
        Title: "",
        Department: "",
        EmployeeType: "",
        currentStatus: true,
      });
    } catch (error) {
      console.error("Error saving employee: ", error);
    }
  };

  return (
    <div className="employee-form add-employee ">
      <div className="row justify-content-center mt-2">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="mb-0">Add Employee</h3>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => onAddEmployee(e)}>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEmployee.FirstName}
                    onChange={(e) =>
                      setNewEmployee((currEmployee) => ({
                        ...currEmployee,
                        FirstName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEmployee.LastName}
                    onChange={(e) =>
                      setNewEmployee((currEmp) => ({
                        ...currEmp,
                        LastName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newEmployee.Age}
                    onChange={(e) => {
                      const Age = e.target.value;
                      if (!isNaN(Age) && Age >= 20 && Age <= 70) {
                        setErrorAge("");
                      } else {
                        setErrorAge(
                          "Invalid Age! Age must be between 20 and 70"
                        );
                      }
                      setNewEmployee((currEmp) => ({
                        ...currEmp,
                        Age: Age,
                      }));
                    }}
                  />
                  {errorAge && <p className="text-danger">{errorAge}</p>}
                </div>
                <div className="form-group">
                  <label>Date of Joining</label>
                  <input
                    type="date"
                    className="form-control"
                    value={newEmployee.DateOfJoining}
                    onChange={(e) =>
                      setNewEmployee((currEmp) => ({
                        ...currEmp,
                        DateOfJoining: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <select
                    className="form-control"
                    value={newEmployee.Title}
                    onChange={(e) =>
                      setNewEmployee((currEmp) => ({
                        ...currEmp,
                        Title: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select Title</option>
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Director">Director</option>
                    <option value="VP">VP</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <select
                    className="form-control"
                    value={newEmployee.Department}
                    onChange={(e) =>
                      setNewEmployee((currEmp) => ({
                        ...currEmp,
                        Department: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Employee Type</label>
                  <select
                    className="form-control"
                    value={newEmployee.EmployeeType}
                    onChange={(e) =>
                      setNewEmployee((currEmp) => ({
                        ...currEmp,
                        EmployeeType: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select Employee Type</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Seasonal">Seasonal</option>
                  </select>
                </div>
                <button type="submit" className="btn mt-3 btn-primary">
                  Add Employee
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAdd;
