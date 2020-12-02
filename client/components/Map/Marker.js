import { useContext } from "react";
import styles from "../../styles/mapmarker.module.scss";
import ThemeContext from "../../theme/Context";

const MapMarker = ({ text }) => {
  const { invertedThemeClass } = useContext(ThemeContext);
  return (
    <div className={`${styles.placeholder}`}>
      <div className={`${styles.point} ${invertedThemeClass}`} />
      <div className={`${styles.label} ${invertedThemeClass}`}>{text}</div>
    </div>
  );
};

export default MapMarker;
