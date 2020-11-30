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

  useEffect(() => {
    setThemeClass(darkMode.value ? "dark-mode" : "light-mode");
    setLabel(darkMode.value ? "☀" : "☾");
    setMapTheme(darkMode.value ? googleMapDark : googleMapLight);
  }, [darkMode.value]);

  const invertedThemeClass =
    themeClass === "light-mode" ? "dark-mode" : "light-mode";
  return (
    <ThemeContext.Provider
      value={{ darkMode, themeClass, invertedThemeClass, label, mapTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
