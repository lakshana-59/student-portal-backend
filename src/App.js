import React from "react";
import { Routes, Route } from "react-router-dom";
import { User } from "./schema.js";
function App() {
  return (
      <Routes> 
         <Route path="/schema" element={<schema />} /> 
      </Routes>
  );
}

export default App;