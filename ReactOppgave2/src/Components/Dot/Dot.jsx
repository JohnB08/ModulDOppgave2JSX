import Style from "./Dot.module.css";

/**
 *
 * @returns svg, bilde av sirkel
 */
export const Dot = () => {
  return (
    <svg height="100" width="100" className={Style.Dot}>
      <circle
        cx={50}
        cy={50}
        r={40}
        stroke="#0f1a18"
        strokeWidth="3"
        fill="transparent"
      />
    </svg>
  );
};
