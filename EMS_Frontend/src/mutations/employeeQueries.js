import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query getEmployees {
    employees {
      id
      FirstName
      LastName
      Age
      DateOfJoining
      Title
      Department
      EmployeeType
      currentStatus
    }
  }
`;

export const GET_EMPLOYEE_BY_ID = gql`
  query getEmployee($id: ID!) {
    employee(id: $id) {
      id
      FirstName
      LastName
      Age
      DateOfJoining
      Title
      Department
      EmployeeType
      currentStatus
    }
  }
`;
