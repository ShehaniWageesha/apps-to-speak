import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNavBar from "../src/components/TopNavBar";
import FooterComponent from "../src/components/Footer";
import HomePage from "../src/pages/HomePage";
import CoursePage from "../src/pages/CoursePage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <TopNavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursePage />} />
      </Routes>
      <FooterComponent />
    </Router>
  );
};

export default App;
