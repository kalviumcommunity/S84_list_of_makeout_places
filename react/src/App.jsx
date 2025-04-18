import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddSpot from "./pages/AddSpot";
import EditSpot from "./pages/EditSpot"; // assuming you already have this

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddSpot />} />
        <Route path="/edit/:id" element={<EditSpot />} />
      </Routes>
    </Router>
  );
}

export default App;
