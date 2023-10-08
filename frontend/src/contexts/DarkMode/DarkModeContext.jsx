import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setdarkMode] = useState("light");

  useEffect(() => {
    if (darkMode === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [darkMode]); // Listen for changes to the darkMode state

  const toggledarkMode = () => {
    setdarkMode((prevdarkMode) =>
      prevdarkMode === "light" ? "dark" : "light"
    );
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggledarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
