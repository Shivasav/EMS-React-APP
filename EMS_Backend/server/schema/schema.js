// Import your Employee model
const Employee = require("../models/Employee");
const dateScalar = require("../scalars/date");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} = require("graphql");

// Define the EmployeeType
const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: () => ({
    id: { type: GraphQLID },
    FirstName: { type: GraphQLString },
    LastName: { type: GraphQLString },
    Age: { type: GraphQLInt },
    DateOfJoining: { type: dateScalar },
    Title: { type: GraphQLString },
    Department: { type: GraphQLString },
    EmployeeType: { type: GraphQLString },
    currentStatus: { type: GraphQLBoolean },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    employee: {
      type: EmployeeType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Employee.findById(args.id);
      },
    },
    employees: {
      type: new GraphQLList(EmployeeType),
      resolve(parent, args) {
        return Employee.find();
      },
    },
  },
});

// Define the Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addEmployee: {
      type: EmployeeType,
      args: {
        FirstName: { type: GraphQLNonNull(GraphQLString) },
        LastName: { type: GraphQLNonNull(GraphQLString) },
        Age: { type: GraphQLNonNull(GraphQLInt) },
        DateOfJoining: { type: GraphQLNonNull(dateScalar) },
        Title: { type: GraphQLNonNull(GraphQLString) },
        Department: { type: GraphQLNonNull(GraphQLString) },
        EmployeeType: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const insertNewEmployeeData = new Employee({
          FirstName: args.FirstName,
          LastName: args.LastName,
          Age: args.Age,
          DateOfJoining: args.DateOfJoining,
          Title: args.Title,
          Department: args.Department,
          EmployeeType: args.EmployeeType,
          currentStatus: true, // Assuming     currentStatus defaults to true
        });
        return insertNewEmployeeData.save();
      },
    },
    deleteEmployee: {
      type: EmployeeType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Employee.findByIdAndDelete(args.id);
      },
    },
    updateEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        FirstName: { type: GraphQLString },
        LastName: { type: GraphQLString },
        Age: { type: GraphQLInt },
        DateOfJoining: { type: dateScalar },
        Title: { type: GraphQLString },
        Department: { type: GraphQLString },
        EmployeeType: { type: GraphQLString },
        currentStatus: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        return Employee.findByIdAndUpdate(args.id, args, { new: true });
      },
    },
  },
});

// Define the GraphQL schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
