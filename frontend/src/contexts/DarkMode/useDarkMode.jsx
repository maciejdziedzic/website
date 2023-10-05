import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

const useDarkMode = () => {
  return useContext(DarkModeContext);
};

export default useDarkMode;
