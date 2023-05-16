import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import RecipeForm from "./components/addRecipeForm/AddRecipeForm";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe-form" element={<RecipeForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
