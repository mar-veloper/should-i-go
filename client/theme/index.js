import ThemeContext from "./Context";
import useDarkMode from "use-dark-mode";
import { useEffect, useState } from "react";
import googleMapDark from "./google.map.dark.json";
import googleMapLight from "./google.map.light.json";

export default function ThemeProvider({ children }) {
  const darkMode = useDarkMode(false);
  const [label, setLabel] = useState(null);
  const [themeClass, setThemeClass] = useState(null);
  const [mapTheme, setMapTheme] = useState(null);
  const [bgTheme, setBgTheme] = useState(null);

  useEffect(() => {
    setThemeClass(darkMode.value ? "dark-mode" : "light-mode");
    setLabel(
      darkMode.value ? (
        <i className="fas fa-sun" />
      ) : (
        <i className="fas fa-moon" />
      )
    );
    setMapTheme(darkMode.value ? googleMapDark : googleMapLight);
    setBgTheme(
      darkMode.value
        ? "/assets/media/bg-dark.png"
        : "/assets/media/bg-light.png"
    );
  }, [darkMode.value]);

  const invertedThemeClass =
    themeClass === "light-mode" ? "dark-mode" : "light-mode";
  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        themeClass,
        invertedThemeClass,
        label,
        mapTheme,
        bgTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
