import React, {useEffect} from 'react';

const GameSlider = ({
    sliderWidth,
    position,
}) => {
    return (
        <div className="game-slider" style={{ width: sliderWidth + 25 }}>
            <div className="handle" style={{left: position}}/>
            <div className="marker"/>
        </div>
    );
};

export default GameSlider;