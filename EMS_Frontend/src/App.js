import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeeDirectory from "./components/EmployeeDirectory";
import CreateEmployee from "./components/EmployeeAdd";
import EmployeeEditPage from "./components/EmployeeEditPage";
import EmployeeDetail from "./components/EmployeeDetail";
import NavbarComponent from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Background } from "./components/Background";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="app-main">
        <Background />
        <div className="App">
          <Header />
          <NavbarComponent />
          <EmployeeDirectory />
          <Footer />
        </div>
      </div>
    ),
  },
  {
    path: "/addEmployee",
    element: (
      <div className="app-main">
        <Background />
        <div className="App">
          <Header />
          <NavbarComponent />
          <CreateEmployee />
          <Footer />
        </div>
      </div>
    ),
  },
  {
    path: "/editEmployee/:id",
    element: (
      <div className="app-main">
        <Background />
        <div className="App">
          <Header />
          <NavbarComponent />
          <EmployeeEditPage />
          <Footer />
        </div>
      </div>
    ),
  },
  {
    path: "/details/:id",
    element: (
      <div className="app-main">
        <Background />
        <div className="App">
          <Header />
          <NavbarComponent />
          <EmployeeDetail />
          <Footer />
        </div>
      </div>
    ),
  },
]);

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
