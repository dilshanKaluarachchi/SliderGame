import React from 'react';
import player from '../../assets/player.png';

const pad = 35;

const GamePlayer = ({
    x,
    y,
}) => {
    return (
        <div className="player" style={{left: x+pad, top: y+pad}}>
            <img src={player} alt=""/>
        </div>
    );
};

export default GamePlayer;