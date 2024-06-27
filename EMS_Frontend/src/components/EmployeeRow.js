import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_EMPLOYEE } from "../mutations/employeeMutation";
import { useNavigate } from "react-router-dom";
import { Trash, PencilSquare, InfoCircleFill } from "react-bootstrap-icons";

const EmployeeRow = (props) => {
  const navigate = useNavigate();
  const employee = props.employee;
  const index = props.index;
  const setEmployeeList = props.setEmployeeList;

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    variables: { id: employee.id },
  });

  const onDeleteEmployee = () => {
    deleteEmployee();
    setEmployeeList((currEmployeeList) => {
      return currEmployeeList.filter(
        (currEmployee) => currEmployee.id !== employee.id
      );
    });
    window.location.reload();
  };
  const onEditEmployee = () => {
    navigate(`/editEmployee/${employee.id}`);
  };

  if (!employee) return <h3>Employee Row</h3>;

  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  };

  const onViewDetails = () => {
    navigate(`/details/${employee.id}`);
  };

  const formattedDOJ = new Date(employee.DateOfJoining).toLocaleDateString(
    "en-GB",
    dateOptions
  );

  const status = employee.currentStatus ? "Working" : "Not Working";
  return (
    <tr>
      <td>{index}</td>
      {Object.entries(employee).map(([key, value], i) => {
        if (key !== "__typename" && key !== "id") {
          return (
            <td key={i}>
              {key === "DateOfJoining"
                ? formattedDOJ
                : key === "currentStatus"
                ? status
                : value}
            </td>
          );
        }
        return null;
      })}
      <td>
        <InfoCircleFill
          size={30}
          onClick={onViewDetails}
          className="view-icon"
          title="View Details"
        />
        <PencilSquare
          size={30}
          onClick={onEditEmployee}
          className="edit-icon"
          title="Edit employee Data"
        />
        <Trash
          size={30}
          onClick={onDeleteEmployee}
          className="delete-icon"
          title="Delete employee Data"
        />
      </td>
    </tr>
  );
};

export default EmployeeRow;
