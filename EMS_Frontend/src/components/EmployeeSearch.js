import React, { useState } from "react";

const EmployeeSearch = ({ handleSearch, showFilters }) => {
  const [searchVal, setSearchVal] = useState("");
  const [showFiltersText, setShowFiltersText] = useState("Show Filters");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchVal(event.target.value);
    handleSearch(event.target.value);
  };

  const handleShowFiltersClick = () => {
    setShowFiltersText(
      showFiltersText === "Show Filters" ? "Hide Filters" : "Show Filters"
    );
    showFilters();
  };

  return (
    <div className="d-flex">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search Employee"
        value={searchVal}
        onChange={handleSubmit}
      />
      <button className="show-filters" onClick={handleShowFiltersClick}>
        {showFiltersText}
      </button>
    </div>
  );
};

export default EmployeeSearch;
