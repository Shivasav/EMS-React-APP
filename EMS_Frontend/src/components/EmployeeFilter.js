import React from "react";

const EmployeeFilter = ({ filters, handleChangeFilter }) => {
  const ageSortOptions = ["Ascending", "Descending"];
  const departments = ["IT", "Marketing", "HR", "Engineering"];
  const titles = ["Employee", "Manager", "Director", "VP"];
  const empTypes = ["Full Time", "Part Time", "Contract", "Seasonal"];

  const filterChange = (e) => {
    const { name, value } = e.target;
    handleChangeFilter(name, value);
  };

  return (
    <div className="employee-filter container">
      <h3>Filters</h3>
      <div className="row">
        <div className="col-md-3">
          <label htmlFor="Age">Age:</label>
          <select
            className="filter-select"
            id="Age"
            name="Age"
            value={filters.Age || ""}
            onChange={filterChange}
          >
            <option value="">Default</option>
            {ageSortOptions.map((option) => (
              <option key={option} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="Department">Department:</label>
          <select
            className="filter-select"
            id="Department"
            name="Department"
            value={filters.Department || ""}
            onChange={filterChange}
          >
            <option value="">All</option>
            {departments.map((Department) => (
              <option key={Department} value={Department}>
                {Department}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="Title">Job Title:</label>
          <select
            className="filter-select"
            id="Title"
            name="Title"
            value={filters.Title || ""}
            onChange={filterChange}
          >
            <option value="">All</option>
            {titles.map((Title) => (
              <option key={Title} value={Title}>
                {Title}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="EmployeeType">Employee Type:</label>
          <select
            className="filter-select"
            id="EmployeeType"
            name="EmployeeType"
            value={filters.EmployeeType || ""}
            onChange={filterChange}
          >
            <option value="">All</option>
            {empTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-3">
          <label htmlFor="currentStatus">Status:</label>
          <select
            className="filter-select"
            id="currentStatus"
            name="currentStatus"
            value={filters.currentStatus || ""}
            onChange={filterChange}
          >
            <option value="">All</option>
            <option value="true">Working</option>
            <option value="false">Not Working</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFilter;
