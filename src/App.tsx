import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Breed from "./pages/Breed";
import BreedStory from "./pages/BreedStory";
function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<BreedStory/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
