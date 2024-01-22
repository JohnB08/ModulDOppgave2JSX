import {
  gameState,
  checkWin,
  resetGameState,
  updateWinCount,
  drawCheck,
} from "../../gameFunctions/gameState.mjs";
import { Cross } from "../Cross/Cross";
import { Dot } from "../Dot/Dot";
import Style from "./GameBoard.module.css";
import { useState } from "react";

export const GameBoard = () => {
  /* Hver "useState" tilsvarer en "state" en global variabel brukt av 
  react componenten kan ha. Siden GameBoard componente må tracke tre ting: BoardState, currentPlater og om noen har vunnet,
  må det settes opp useStates for disse, sånn at react vet componenten må reloades når disse variablene er "satt" på nytt.
  
  Eksempel:
  const [newBoardState, setGameBoard] = useState(gameState)
  
  her destrukrurerer vi ut useStatefunksjonen, med den satte variabelen den skal oppdateres med. 
  newBoardState er variabelnavnet komponenten bruker hver gang den refererer til en variabel med samme struktur som gameState.
  setGameBoard er det funksjonen som oppdaterer "state" for variabelen heter.
  
  setGameBoard trengs ikke å bli deklarert, for det er det vi kaller den innebygde funksjonen som bli destrukturert ut fra useState. 
  
  funksjonene setGameBoard, setActivePlayer og setWinState er teknisk sett den samme funksjonen, bare destrukturert til forskjellige referanser,
  så vi vet hvilken "State" som skal brukes til en hver tid. Dette lar oss bestemme når React oppdaterer componenten basert på når vi setter en ny "State"
  til variabelen tilknyttet den destrukturerte funksjonen. setGameBoard(newBoardState) vil fortelle react at de nå skal
  reloade alle elementer som bruker newBoardState på nytt.*/
  const [newBoardState, setGameBoard] = useState(gameState);
  const [currentPlayer, setActivePlayer] = useState(1);
  const [winner, setWinState] = useState(0);
  const [winCount, setWinCount] = useState([0, 0, 0]);

  const updateBoardState = (row, column, playerValue) => {
    newBoardState[row][column] = playerValue;
    setGameBoard(newBoardState);
  };

  const updateGame = (row, column) => {
    updateBoardState(row, column, currentPlayer);
    console.log(newBoardState);
    setWinState(checkWin(newBoardState));
    setActivePlayer(currentPlayer === 1 ? 2 : 1);
  };

  return (
    <div>
      <div className={Style.winTracker}>
        <p>Player 1 has won {winCount[1]} times.</p>
        <p>Player 2 has won {winCount[2]} times.</p>
      </div>
      {/* mapper først ut alle rows, tilsvarer gameState[i] */}
      {gameState.map((row, rowIndex) => (
        /* Mapper så alle columns, tilsvarer gameState[i][j] */
        <div key={rowIndex} className={Style.rows}>
          {row.map((squareStateValue, columnIndex) => (
            /* Lager en knapp for hver value i 2d array. */
            <button
              key={columnIndex}
              className={Style.button}
              onClick={() => {
                /* Hvis ingen har vunnet, så fortsetter spillet, hvis ikke skjer ingenting. */
                !winner && !squareStateValue
                  ? updateGame(rowIndex, columnIndex)
                  : winner;
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
      {/* Denne div popper kun opp hvis noen har vunnet. hvis ikke forvinner den. */}
      {winner || drawCheck(newBoardState) ? (
        <div className={Style.winStateContainer}>
          {winner ? (
            <p>Congratulations, player {winner} won!</p>
          ) : (
            <p>It is a draw!</p>
          )}
          <button
            className={Style.resetBtn}
            onClick={() => {
              /* resetter gamestate til 0 verdi. */
              setGameBoard(resetGameState(newBoardState));
              setWinCount(updateWinCount(winCount, winner));
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
