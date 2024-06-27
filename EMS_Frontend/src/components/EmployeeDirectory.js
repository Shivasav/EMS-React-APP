import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import EmployeeTable from "./EmployeeTable";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeFilter from "./EmployeeFilter";
import { GET_EMPLOYEES } from "../mutations/employeeQueries";

const EmployeeDirectory = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({
    Age: "",
    Department: "",
    Title: "",
    EmployeeType: "",
    currentStatus: "",
  });

  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  useEffect(() => {
    if (data && data.employees) {
      setEmployeeList(data.employees);
      setFilteredEmployeeList(data.employees);
      handleFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filter, employeeList]);

  const searchEmployee = (text) => {
    const filteredList = employeeList.filter(
      (emp) =>
        emp.FirstName.toLowerCase().includes(text.toLowerCase()) ||
        emp.LastName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredEmployeeList(filteredList);
  };

  const handleFilters = () => {
    let filteredList = [...employeeList];

    if (filter.Age !== "") {
      if (filter.Age === "ascending") {
        filteredList = filteredList.sort((a, b) => a.Age - b.Age);
      } else if (filter.Age === "descending") {
        filteredList = filteredList.sort((a, b) => b.Age - a.Age);
      }
    }

    if (filter.Department !== "") {
      filteredList = filteredList.filter(
        (emp) =>
          emp.Department.toLowerCase() === filter.Department.toLowerCase()
      );
    }

    if (filter.Title !== "") {
      filteredList = filteredList.filter(
        (emp) => emp.Title.toLowerCase() === filter.Title.toLowerCase()
      );
    }

    if (filter.EmployeeType !== "") {
      filteredList = filteredList.filter(
        (emp) =>
          emp.EmployeeType.toLowerCase() === filter.EmployeeType.toLowerCase()
      );
    }

    if (filter.currentStatus !== "") {
      filteredList = filteredList.filter(
        (emp) => emp.currentStatus === (filter.currentStatus === "true")
      );
    }

    setFilteredEmployeeList(filteredList);
  };

  const removeFilters = () => {
    setFilter({
      Age: "",
      Department: "",
      Title: "",
      EmployeeType: "",
      currentStatus: "",
    });
  };

  const handleChangeFilter = (name, value) => {
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const showFilters = () => {
    setShowFilter(!showFilter);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div className="employee-directory container-fluid py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <EmployeeSearch
              handleSearch={searchEmployee}
              showFilters={showFilters}
            />
          </div>
        </div>

        {showFilter && (
          <>
            <div className="row justify-content-center mt-4">
              <div className="col-md-6">
                <EmployeeFilter
                  filters={filter}
                  handleChangeFilter={handleChangeFilter}
                />
              </div>
            </div>
            <div className="row justify-content-center mt-4">
              <div className="col-md-6">
                <button className="clear-filter" onClick={removeFilters}>
                  Clear Filters
                </button>
              </div>
            </div>
          </>
        )}

        <div className="row justify-content-center mt-4">
          <div className="col-md-10">
            <EmployeeTable
              employeeList={filteredEmployeeList}
              setEditEmployee={setEditEmployee}
              setEmployeeList={setEmployeeList}
            />
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            {editEmployee !== null && (
              <EmployeeEdit
                editEmployee={editEmployee}
                setEmployeeList={setEmployeeList}
                setEditEmployee={setEditEmployee}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDirectory;
