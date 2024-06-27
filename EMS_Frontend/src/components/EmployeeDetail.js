import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYEE_BY_ID } from "../mutations/employeeQueries";
import { useParams } from "react-router-dom";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id },
  });

  useEffect(() => {
    if (data && data.employee) {
      setEmployee(data.employee);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  if (!employee) return null;

  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  };

  const formattedDOJ = new Date(employee.DateOfJoining).toLocaleDateString(
    "en-GB",
    dateOptions
  );

  return (
    <div className="employee-form employee-details ">
      <div className="row justify-content-center mt-2">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="mb-0">Employee Details</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={employee.FirstName}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={employee.LastName}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    className="form-control"
                    value={employee.Age}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Date of Joining</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formattedDOJ}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={employee.Title}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    className="form-control"
                    value={employee.Department}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Employee Type</label>
                  <input
                    type="text"
                    className="form-control"
                    value={employee.EmployeeType}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Current Status</label>
                  <input
                    type="text"
                    className="form-control"
                    value={employee.currentStatus ? "Working" : "Not Working"}
                    readOnly
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
