import Style from "./WinStateAnnouncer.module.css";

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
