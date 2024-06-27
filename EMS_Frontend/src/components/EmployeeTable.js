import React from "react";
import EmployeeRow from "./EmployeeRow";

const EmployeeTable = ({ employeeList, setEmployeeList, setEditEmployee }) => {
  const tableHeaders = [
    "Serial No.",
    "First Name",
    "Last Name",
    "Age",
    "Date of Joining",
    "Title",
    "Department",
    "Employee Type",
    "Current Status",
    "Actions",
  ];

  if (!employeeList || employeeList.length === 0) {
    return <p className="no-employees">No employees found!</p>;
  }

  const employeeRows = employeeList.map((emp, index) => (
    <EmployeeRow
      employee={emp}
      index={index + 1}
      key={emp.id}
      setEditEmployee={setEditEmployee}
      setEmployeeList={setEmployeeList}
    />
  ));

  return (
    <table className="employee-table">
      <thead>
        {tableHeaders.map((header, key) => (
          <th key={key}>{header}</th>
        ))}
      </thead>
      <tbody>{employeeRows}</tbody>
    </table>
  );
};

export default EmployeeTable;
