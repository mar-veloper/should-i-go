import { useContext } from "react";
import ThemeContext from "../../theme/Context";

export default function ThemeToggle() {
  const { darkMode, invertedThemeClass, label } = useContext(ThemeContext);
  const onClick = darkMode.value ? darkMode.disable : darkMode.enable;

  return (
    <div className="dark-mode-toggle">
      <button type="button" className={invertedThemeClass} onClick={onClick}>
        {label}
      </button>
    </div>
  );
}
