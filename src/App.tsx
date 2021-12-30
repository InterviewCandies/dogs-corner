import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Breed from "./pages/Breed";
import BreedStory from "./pages/BreedStory";
import NavBar from "./components/NavBar";
import Collection from "./pages/Collection";
function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
          <Route path="/story" element={<BreedStory/>}></Route>
          <Route path="/collection" element={<Collection/>}></Route>
          <Route path="/" element={<Breed/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
