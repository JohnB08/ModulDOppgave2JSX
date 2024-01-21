import Style from "./Dot.module.css";

export const Dot = () => {
  return (
    <svg height="100" width="100" className={Style.Dot}>
      <circle
        cx={50}
        cy={50}
        r={40}
        stroke="black"
        strokeWidth="3"
        fill="transparent"
      />
    </svg>
  );
};
