import { gql } from "@apollo/client";

export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation addEmployee(
    $FirstName: String!
    $LastName: String!
    $Age: Int!
    $DateOfJoining: Date!
    $Title: String!
    $Department: String!
    $EmployeeType: String!
  ) {
    addEmployee(
      FirstName: $FirstName
      LastName: $LastName
      Age: $Age
      DateOfJoining: $DateOfJoining
      Title: $Title
      Department: $Department
      EmployeeType: $EmployeeType
    ) {
      id
      FirstName
      LastName
      Age
      DateOfJoining
      Title
      Department
      EmployeeType
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee(
    $id: ID!
    $FirstName: String
    $LastName: String
    $Age: Int
    $DateOfJoining: Date
    $Title: String
    $Department: String
    $EmployeeType: String
    $currentStatus: Boolean
  ) {
    updateEmployee(
      id: $id
      FirstName: $FirstName
      LastName: $LastName
      Age: $Age
      DateOfJoining: $DateOfJoining
      Title: $Title
      Department: $Department
      EmployeeType: $EmployeeType
      currentStatus: $currentStatus
    ) {
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
