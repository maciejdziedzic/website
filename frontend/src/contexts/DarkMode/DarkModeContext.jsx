import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setdarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    document.body.classList.toggle("light", !darkMode);
  }, [darkMode]); // Listen for changes to the darkMode state

  const toggledarkMode = () => {
    setdarkMode((prevdarkMode) => !prevdarkMode);
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
