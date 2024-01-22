import {
  gameState,
  checkWin,
  resetGameState,
  updateWinCount,
  drawCheck,
} from "../../gameFunctions/gameState.mjs";
import { GameSquare } from "../GameSquare/GameSquare";
import { WinStateAnnouncer } from "../WinStateAnnouncer/WinStateAnnouncer";
import { WinTracker } from "../WinTracker/WinTracker";
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

  /**
   * oppdaterer en koordinat i 2d array med ny verdi
   * @param {*} row hvilken rad
   * @param {*} column hvilken kolonne
   * @param {*} playerValue hva verdi skal settes
   */
  const updateBoardState = (row, column, playerValue) => {
    newBoardState[row][column] = playerValue;
    setGameBoard(newBoardState);
  };

  /**
   * samlingsfunksjon for å oppdatere alle states hver gang en brikke er valgt.
   * @param {*} row koordinat i rad til knappen som nettopp er oppdatert
   * @param {*} column koordinat i kolonnen til knappen som nettopp er oppdatert.
   */
  const updateGame = (row, column) => {
    updateBoardState(row, column, currentPlayer);
    console.log(newBoardState);
    setWinState(checkWin(newBoardState));
    setActivePlayer(currentPlayer === 1 ? 2 : 1);
  };

  return (
    <div className={Style.GameBoard}>
      <WinTracker winCount={winCount} />
      {/* mapper først ut alle rows, tilsvarer gameState[i] */}
      {gameState.map((row, rowIndex) => (
        /* Mapper så alle columns, tilsvarer gameState[i][j] */
        <div key={rowIndex} className={Style.rows}>
          {row.map((squareStateValue, columnIndex) => (
            /* Lager en GameSquare react komponent for hver value i 2d array. */
            <GameSquare
              key={columnIndex}
              SquareState={squareStateValue}
              onClick={() => {
                /* Hvis ingen har vunnet, så fortsetter spillet, hvis ikke skjer ingenting. */
                !winner && !squareStateValue
                  ? updateGame(rowIndex, columnIndex)
                  : winner;
              }}
            />
          ))}
        </div>
      ))}
      {/* Denne div popper kun opp hvis noen har vunnet, eller det finner en draw. hvis ikke er den skjult. */}
      {winner || drawCheck(newBoardState) ? (
        <WinStateAnnouncer
          winner={winner}
          onClick={() => {
            /* resetter gamestate til 0 verdi. */
            setGameBoard(resetGameState(newBoardState));
            setWinCount(updateWinCount(winCount, winner));
            setActivePlayer(1);
            setWinState(0);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};
