import React, { useEffect, useState } from 'react';
import GameBody from "./game-body";
import "./game-styles.css";
import GameSlider from "./game-slider";
import GameScore from "./game-score";

const sliderWidth = 100;
const speed = 0;
const hardness = 20;
let dir;
let to;
const boxes = [{
    number: 0,
}, {
    number: 0,
}, {
    number: 0,
}, {
    number: 0,
}, {
    number: 0,
}, {
    number: 0,
}, {
    number: 0,
}, {
    number: 0,
}, {
    number: 0,
}];

const getBoxPos = (b) => {
    const box = document.getElementById(`box${b}`);
    if (!box) return;
    const boxY = box.offsetTop;
    const boxX = box.offsetLeft;
    return {
        x: boxX,
        y: boxY,
    }
};

const getScore = (time, setTime) => {
    const now = performance.now();
    const dif = now - time;
    let t;

    if (dif < 1200) {
        t = 5;
    } else if (dif > 1200) {
        t = 2;
    }
    setTime(performance.now());
    return t;
};

const Game = () => {
    const [position, setPosition] = useState(1);
    const [player, setPlayer] = useState({
        box: 1,
        y: 0,
        x: 0,
    });
    const [score, setScore] = useState(0);
    const [final, setFinal] = useState(null);
    const [time, setTime] = useState(performance.now());

    const runSlider = (pos) => {
        if (pos === 1) dir = '+';
        if (pos === 100) dir = '-';

        const exec = (val) => {
            clearTimeout(to);
            setPosition(val);
            to = setTimeout(() => {
                runSlider(pos);
            }, speed);
        };

        if (dir === '+') {
            exec(pos += 1);
        } else {
            exec(pos -= 1);
        }
    };

    const movePlayer = (b) => {
        const boxPos = getBoxPos(b);
        setPlayer({
            box: player.box + 1,
            x: boxPos.x,
            y: boxPos.y,
        });
    };

    const reset = () => {
        const boxPos = getBoxPos(0);
        setScore(0);
        setPlayer({
            box: 1,
            y: boxPos.y,
            x: boxPos.x,
        });
    };

    const go = () => {
        if (player.box === boxes.length) {
            setFinal(score);
            return reset();
        }

        // Check whether the curser position is close to the middle of the slider
        const ok1 = position < (sliderWidth / 2 + hardness);
        const ok2 = position > (sliderWidth / 2 - hardness);


        // const fail1 = position > (sliderWidth - hardness) && position < (sliderWidth);
        // const fail2 = position > 1 && position < (sliderWidth - position);

        if (ok1 && ok2) {
            const sc = getScore(time, setTime);
            setScore(score + sc);
            movePlayer(player.box);
        } else {
            reset();
        }
    };

    useEffect(() => {
        runSlider(position);
        reset();
    }, []);

    return (
        <div>
            <div className="game">
                <GameBody boxes={boxes} player={player} />
                <div className="game-controller">
                    <div className="game-control">
                        <GameSlider sliderWidth={sliderWidth} position={position} />
                    </div>
                    <div className="game-control">
                        <GameScore score={score} />
                    </div>
                    <div className="game-control button-go">
                        <button type="button" className="btn" onClick={(e) => go()}>Go</button>
                    </div>
                </div>
            </div>
            {
                final
                    ? <h3 style={{ color: 'green' }}>You scored: {final}</h3>
                    : null
            }
        </div>
    );
};

export default Game;