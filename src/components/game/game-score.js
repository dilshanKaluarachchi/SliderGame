import React from 'react';

const GameScore = ({
    score,
}) => {
    return (
        <div className="score">Score: <b>{ score }</b></div>
    );
};

export default GameScore;