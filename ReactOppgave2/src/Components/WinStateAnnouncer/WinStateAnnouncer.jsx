import Style from "./WinStateAnnouncer.module.css";

/**
 * Lager en div som viser hvem som vant eller draw basert på om winner blir sendt inn.
 * Sender også inn en onClick funksjon for knappen i div, sånn at knappen kan resette gameState.
 * @param {{number, function(){}}} Properties
 * @returns div element with p tag and button.
 */
export const WinStateAnnouncer = ({ winner, onClick }) => {
  return (
    <div className={Style.winStateContainer}>
      {winner ? (
        <p>Congratulations, player {winner} won!</p>
      ) : (
        <p>It is a draw!</p>
      )}
      <button className={Style.resetBtn} onClick={onClick}>
        Play again?
      </button>
    </div>
  );
};
