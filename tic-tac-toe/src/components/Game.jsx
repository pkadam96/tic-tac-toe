import { useState } from 'react';
import Board from './Board';

const Game = () => {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [playerX, setPlayerX] = useState('');
    const [playerO, setPlayerO] = useState('');
    const [isNameSubmitted, setIsNameSubmitted] = useState(false);

    const handleClick = (i) => {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(newHistory.concat([{ squares }]));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    };

    const handleNameSubmit = () => {
        if (playerX.trim() !== '' && playerO.trim() !== '') {
            setIsNameSubmitted(true);
        }
    };

    const handleRestart = () => {
        setHistory([{ squares: Array(9).fill(null) }]);
        setStepNumber(0);
        setXIsNext(true);
        setIsNameSubmitted(true);
    };

    const handleClose = () => {
        setHistory([{ squares: Array(9).fill(null) }]);
        setStepNumber(0);
        setXIsNext(true);
        setIsNameSubmitted(false);
        setPlayerO('');
        setPlayerX('')
    };

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
        status = (
            <div className="winner-message">
                <div>Congratulations {winner === 'X' ? playerX : playerO} !!!</div>
                <span>You are WINNER</span>
            </div>
        );
    } else if (isBoardFull(current.squares)) {
        status = (
            <div className="draw-message" style={{}}>
                <span>Draw: No Winner</span>
            </div>
        );
    } else {
        status = 'Next player: ' + (xIsNext ? playerX : playerO);
    }

    return (
        <div className="game">
            {!isNameSubmitted ? (
                <div className="name-inputs">
                    <h2>TIC-TAC-TOE</h2>
                    <div>
                        <label>
                            Player X: <input type="text" value={playerX} onChange={(e) => setPlayerX(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Player O: <input type="text" value={playerO} onChange={(e) => setPlayerO(e.target.value)} />
                        </label>
                    </div>
                    <button className="button-13" role="button" onClick={handleNameSubmit}>
                        <span className="text">START</span>
                        <span className="button-13-background"></span>
                        <span className="button-13-border"></span>

                        <svg style={{ position: 'absolute' }} width="0" height="0">
                            <filter id="remove-black-button-13" colorInterpolationFilters="sRGB">
                                <feColorMatrix
                                    type="matrix"
                                    values="1 0 0 0 0
                                            0 1 0 0 0
                                            0 0 1 0 0
                                            -1 -1 -1 0 1"
                                    result="black-pixels"
                                ></feColorMatrix>
                                <feComposite in="SourceGraphic" in2="black-pixels" operator="out"></feComposite>
                            </filter>
                        </svg>
                    </button>

                </div>
            ) : (
                <div className='board'>
                    <button className='closeBtn' onClick={handleClose}>X</button>
                    <div className='squares'>
                        <Board squares={current.squares} onClick={handleClick} />
                    </div>
                    <div className="game-info">
                        {status}
                    </div>
                    <button className="button-13" role="button" style={{margin:0, padding:"3% 15%"}} onClick={handleRestart}>
                        <span className="text" >Restart</span>
                        <span className="button-13-background"></span>
                        <span className="button-13-border"></span>

                        <svg style={{ position: 'absolute' }} width="0" height="0">
                            <filter id="remove-black-button-13" colorInterpolationFilters="sRGB">
                                <feColorMatrix
                                    type="matrix"
                                    values="1 0 0 0 0
                                            0 1 0 0 0
                                            0 0 1 0 0
                                            -1 -1 -1 0 1"
                                    result="black-pixels"
                                ></feColorMatrix>
                                <feComposite in="SourceGraphic" in2="black-pixels" operator="out"></feComposite>
                            </filter>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

const isBoardFull = (squares) => {
    return squares.every(square => square !== null);
};

export default Game;
