import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import EmployeePage from "./components/employeePage"; // Import your Employee component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Route for the root URL */}
        <Route path="/login" element={<Login />} />
        <Route path="/employeePage" element={<EmployeePage />} />
      </Routes>
    </Router>
  );
}

export default App;
