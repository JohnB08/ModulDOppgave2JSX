import Style from "./Cross.module.css";


/**
 * 
 * @returns svg fil, bilde av kryss.
 */
export const Cross = () => {
  return (
    <svg height="100" width="100" className={Style.Cross}>
      <line x1="0" y1="0" x2="100" y2="100" stroke="#0f1a18" strokeWidth={5} />
      <line x1="100" y1="0" x2="0" y2="100" stroke="#0f1a18" strokeWidth={5} />
    </svg>
  );
};
