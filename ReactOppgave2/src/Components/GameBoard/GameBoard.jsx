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

  /**
   * Looper gjennom gameState og ser om det er kommet tre på rad.
   *
   * @param {number[][]} gameState Et todimensjonelt array som representerer boardStatet. hvert tall kan ha en state mellom 0 (ikke valgt), 1 (Dot/spiller1) og 2(Cross/spiller2)
   * @returns
   */
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
        //Diagonalt venstre top, høyre bunn
        if (
          i + 2 < gameState.length &&
          j + 2 < gameState.length &&
          gameState[i][j] === gameState[i + 1][j + 1] &&
          gameState[i][j] === gameState[i + 2][j + 2]
        )
          return gameState[i][j];
        //Diagonalt høyre top venstre bunn.
        if (
          i + 2 < gameState.length &&
          /* Her passer jeg på at jeg starter skjekken på j>3, sånn at jeg vet forige steg vil være når j=2, og siste steg når j=1.
            så den skjekker høyre top først, før den looper bakover og ser etter midtverdi og venstre bunn.  */
          j - 2 >= 0 &&
          gameState[i][j] === gameState[i + 1][j - 1] &&
          gameState[i][j] === gameState[i + 2][j - 2]
        )
          return gameState[i][j];
      }
    }
    return 0;
  };

  const updateGame = (row, column) => {
    updateBoardState(row, column, currentPlayer);
    console.log(newBoardState);
    setWinState(checkWin(newBoardState));
    setActivePlayer(currentPlayer === 1 ? 2 : 1);
  };

  return (
    <div>
      {gameState.map((row, rowIndex) => (
        <div key={rowIndex} className={Style.rows}>
          {row.map((squareStateValue, columnIndex) => (
            <button
              key={columnIndex}
              className={Style.button}
              onClick={() => {
                !winner ? updateGame(rowIndex, columnIndex) : winner;
              }}
            >
              {squareStateValue === 0 ? (
                ""
              ) : squareStateValue === 1 ? (
                <Dot></Dot>
              ) : (
                <Cross></Cross>
              )}
            </button>
          ))}
        </div>
      ))}
      {winner ? (
        <div className={Style.winStateContainer}>
          <p>Congratulations, player {winner} won!</p>
          <button
            className={Style.resetBtn}
            onClick={() => {
              setGameBoard(resetGameState(newBoardState));
              setActivePlayer(1);
              setWinState(0);
            }}
          >
            Play again?
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
