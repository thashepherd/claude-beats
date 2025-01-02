import React from 'react';
import DrumMachine from './components/DrumMachine';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Beat Maker Tool</h1>
      <DrumMachine />
    </div>
  );
};

export default App;