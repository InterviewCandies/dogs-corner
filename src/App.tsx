import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Breed from "./pages/Breed";
function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Breed/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
