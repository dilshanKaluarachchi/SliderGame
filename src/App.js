import React from 'react';
import './App.css';
import Game from "./components/game";

function App() {
  return (
      <>
        <h1>Slider game</h1>
        <div className="app-wrap">
            <Game />
        </div>
      </>
  );
}

export default App;
