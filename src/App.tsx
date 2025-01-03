import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DrumMachine from './components/DrumMachine';
import PongGame from './components/PongGame';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <h1>Beat Maker Tool</h1>
        <Routes>
          <Route path="/" element={<DrumMachine />} />
          <Route path="/pong" element={<PongGame />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
