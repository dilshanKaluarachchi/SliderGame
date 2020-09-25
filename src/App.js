import React from 'react';
import './App.css';
import Game from "./components/game";

function App() {
  return (
    <>
      <h1>Slider Game</h1>

      <h2>
        Lower the score, better the performance.
        Higher the score means you have spent more time to finish the game. Lower the score means you have spent less time to finish the game.
      </h2>

      <div className="app-wrap">
        <Game />
      </div>
    </>
  );
}

export default App;
