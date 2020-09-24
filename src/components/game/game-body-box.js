import React from 'react';
import GamePlayer from "./game-player";

const GameBodyBox = ({
    title,
    player,
    id,
}) => {
    return (
        <div className="section" id={id}>
            <h2 className="title">{ title }</h2>
            {
                player
                    ? <GamePlayer/>
                    : null
            }
        </div>
    );
};

export default GameBodyBox;