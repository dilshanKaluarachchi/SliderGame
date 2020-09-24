import React from 'react';
import GameBodyBox from "./game-body-box";
import GamePlayer from "./game-player";

const GameBody = ({
    boxes,
    player,
}) => {
    return (
        <div className="game-body">
            <GamePlayer x={player.x} y={player.y}/>
            {
                boxes.map((section, i) => {
                    return <GameBodyBox title={i} key={i} id={`box${i}`} />
                })
            }
        </div>
    );
};

export default GameBody;