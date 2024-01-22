import Style from "./WinTracker.module.css";

export const WinTracker = ({ winCount }) => {
  return (
    <div className={Style.winTracker}>
      <p>Player 1 has won {winCount[1]} times.</p>
      <p>Player 2 has won {winCount[2]} times.</p>
    </div>
  );
};
