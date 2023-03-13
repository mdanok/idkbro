import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CounterPage from "./WordsCounter/CounterPage";
import MainPage from "./WordFinder/MainPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/counter" element={<CounterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
