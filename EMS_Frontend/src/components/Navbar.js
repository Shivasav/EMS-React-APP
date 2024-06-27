import React from "react";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <header>
      <h2>EMS By Shivasav</h2>
      <nav>
        <ul>
          <li>
            <Link to="/"> 🏠Home</Link>
          </li>
          <li>
            <Link to="/addEmployee"> ➕ Add Employee</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavbarComponent;
