import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_EMPLOYEE } from "../mutations/employeeMutation";
import { GET_EMPLOYEE_BY_ID } from "../mutations/employeeQueries";

const EmployeeEdit = ({ employeeId }) => {
  const [newEmployeeData, setNewEmployeeData] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [updateEmployeeData] = useMutation(UPDATE_EMPLOYEE);

  const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id: employeeId },
  });

  useEffect(() => {
    if (data && data.employee) {
      setNewEmployeeData(data.employee);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  if (!newEmployeeData) return null;

  const editEmployee = async (event) => {
    event.preventDefault();
    try {
      const parsedAge = parseInt(newEmployeeData.Age);
      if (isNaN(parsedAge)) {
        throw new Error("Age must be a valid number.");
      }

      await updateEmployeeData({
        variables: {
          id: newEmployeeData.id,
          FirstName: newEmployeeData.FirstName,
          LastName: newEmployeeData.LastName,
          Age: parsedAge,
          DateOfJoining: newEmployeeData.DateOfJoining,
          Title: newEmployeeData.Title,
          Department: newEmployeeData.Department,
          EmployeeType: newEmployeeData.EmployeeType,
          currentStatus: newEmployeeData.currentStatus,
        },
      });
      setSuccessMessage("Employee data updated!");

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error updating employee: ", error);
    }
  };

  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  };

  const formattedDOJ = new Date(
    newEmployeeData.DateOfJoining
  ).toLocaleDateString("en-GB", dateOptions);

  const formattedDateToInputValue = (formattedDate) => {
    const [day, month, year] = formattedDate.split("/");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h3 className="mb-0">Edit Employee</h3>
      </div>
      <div className="card-body">
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        <form onSubmit={(e) => editEmployee(e)}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              value={newEmployeeData.FirstName}
              onChange={(e) =>
                setNewEmployeeData((currEmp) => ({
                  ...currEmp,
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
              value={newEmployeeData.LastName}
              onChange={(e) =>
                setNewEmployeeData((currEmp) => ({
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
              value={newEmployeeData.Age}
              onChange={(e) =>
                setNewEmployeeData((currEmp) => ({
                  ...currEmp,
                  Age: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-group">
            <label>Date of Joining</label>
            <input
              type="date"
              className="form-control"
              value={formattedDateToInputValue(formattedDOJ)}
              onChange={(e) =>
                setNewEmployeeData((currEmp) => ({
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
              value={newEmployeeData.Title}
              onChange={(e) =>
                setNewEmployeeData((currEmp) => ({
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
              value={newEmployeeData.Department}
              onChange={(e) =>
                setNewEmployeeData((currEmp) => ({
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
              value={newEmployeeData.EmployeeType}
              onChange={(e) =>
                setNewEmployeeData((currEmp) => ({
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
          <div className="form-group">
            <label>Current Status</label>
            <input
              type="checkbox"
              checked={newEmployeeData.currentStatus}
              onChange={(e) =>
                setNewEmployeeData((currEmp) => ({
                  ...currEmp,
                  currentStatus: e.target.checked,
                }))
              }
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Edit Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeEdit;
