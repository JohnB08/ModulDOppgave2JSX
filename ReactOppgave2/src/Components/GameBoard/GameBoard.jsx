import { gameState } from "../../gameFunctions/gameState.mjs";
import { Cross } from "../Cross/Cross";
import { Dot } from "../Dot/Dot";
import Style from "./GameBoard.module.css";
import { useState } from "react";

export const GameBoard = () => {
  const [newBoardState, setGameBoard] = useState(gameState);
  const [currentPlayer, setActivePlayer] = useState(1);
  const [winner, setWinState] = useState(0);

  const updateBoardState = (row, column, playerValue) => {
    const boardState = [...newBoardState];
    boardState[row][column] = playerValue;
    setGameBoard(boardState);
  };

  const resetGameState = (gameState) => {
    for (let i = 0; i < gameState.length; i++) {
      for (let j = 0; j < gameState[i].length; j++) {
        gameState[i][j] = 0;
      }
    }
    return gameState;
  };

  const checkWin = (gameState) => {
    for (let i = 0; i < gameState.length; i++) {
      for (let j = 0; j < gameState[i].length; j++) {
        //Blar først gjennom 2d array vertikalt i j akse.
        if (gameState[i][j] !== 0) {
          if (
            j + 2 < gameState[i].length &&
            gameState[i][j] === gameState[i][j + 1] &&
            gameState[i][j] === gameState[i][j + 2]
          )
            return gameState[i][j];
        }
        //skjekker gjennom 2d array vertikal akse.
        if (
          i + 2 < gameState.length &&
          gameState[i][j] === gameState[i + 1][j] &&
          gameState[i][j] === gameState[i + 2][j]
        )
          return gameState[i][j];
      }
    }
  };

  return (
    <div>
      {gameState.map((row, rowIndex) => (
        <div key={rowIndex} className={Style.rows}>
          {row.map((column, columnIndex) => (
            <button
              key={columnIndex}
              className={Style.button}
              onClick={() => {
                updateBoardState(rowIndex, columnIndex, currentPlayer);
                console.log(newBoardState);
                setWinState(checkWin(newBoardState));
                setActivePlayer(currentPlayer === 1 ? 2 : 1);
              }}
            >
              {column === 0 ? "" : column === 1 ? <Dot></Dot> : <Cross></Cross>}
            </button>
          ))}
        </div>
      ))}
      {winner ? (
        <div className={Style.winStateContainer}>
          <p>Congratulations, player {currentPlayer} won!</p>
          <button onClick={() => setGameBoard(resetGameState(newBoardState))}>
            Play again?
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
