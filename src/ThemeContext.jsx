import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(true);
  const mode = () => {
    setTheme(!theme);
  };

  const appStyle = {
    backgroundColor: theme ? "#fbffc6b7" : "#333",
    color: theme ? "#000" : "#cecece",
    minHeight: "100vh",
    padding: "20px",
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, appStyle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
