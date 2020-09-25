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
    // This gives x, y positions

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
    // This method gives scores according to the time player took to make a move

    const now = performance.now();
    const dif = now - time;
    let score;

    if (dif < 1000) {
        score = 2;
    } else if (1000 <= dif && dif < 2000) {
        score = 4;
    } else {
        score = 6;
    }

    setTime(performance.now());
    return score;
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
        // This moves the player

        const boxPos = getBoxPos(b);
        setPlayer({
            box: player.box + 1,
            x: boxPos.x,
            y: boxPos.y,
        });
    };

    const resetGame = () => {
        // This resets the game; sets the score to 0 and moves the player to first box

        const boxPos = getBoxPos(0);
        setScore(0);
        setPlayer({
            box: 1,
            y: boxPos.y,
            x: boxPos.x,
        });
    };

    const resetRound = () => {
        // This resets the round; moves the player to first box

        const boxPos = getBoxPos(0);
        setPlayer({
            box: 1,
            y: boxPos.y,
            x: boxPos.x,
        });
    };

    const go = () => {
        if (player.box === boxes.length) {
            setFinal(score);
            return resetGame();
        }

        // Check whether the curser position is close to the middle of the slider
        const ok1 = position < (sliderWidth / 2 + hardness);
        const ok2 = position > (sliderWidth / 2 - hardness);

        // If the curser position is close to the middle of the slider, move the player and increase the score accordingly
        // Else, reset the game
        if (ok1 && ok2) {
            const sc = getScore(time, setTime);
            setScore(score + sc);
            movePlayer(player.box);
        } else {
            resetRound();
        }
    };

    useEffect(() => {
        runSlider(position);
        resetGame();
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