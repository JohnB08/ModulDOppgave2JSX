import { Dot } from "../Dot/Dot";
import { Cross } from "../Cross/Cross";
import Style from "./GameSquare.module.css";

/**
 * Lager en knapp som har tre forskjellige "states" basert på SquareState. Viser innholdet i Button basert på hva "state" blir sent inn.
 * Gir også knappen en onClick funksjon.
 * @param {{number, function(){}}} Properties
 * @returns Button react component
 */
export const GameSquare = ({ SquareState, onClick }) => {
  return (
    <button className={Style.GameSquare} onClick={onClick}>
      {/* Her har vi alle verdiene for innholdet i button basert på squareStateValue */}
      {SquareState === 0 ? (
        ""
      ) : SquareState === 1 ? (
        <Dot></Dot>
      ) : (
        <Cross></Cross>
      )}
    </button>
  );
};
