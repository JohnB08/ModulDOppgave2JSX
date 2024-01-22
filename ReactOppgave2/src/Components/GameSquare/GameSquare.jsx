import { Dot } from "../Dot/Dot";
import { Cross } from "../Cross/Cross";
import Style from "./GameSquare.module.css";

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
