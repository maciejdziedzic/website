import PropTypes from "prop-types";
import { DarkModeContext } from "../../../contexts/Darkmode/DarkModeContext";
import "./AssetButton.css";
import { useContext } from "react";

const Button1 = ({ onClick, label, active }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <button
      className={`button1 w-18 min-w-[96px] flex-shrink-0 h-6 my-1 tracking-wider font-bold rounded 

      ${
        active
          ? `bg-neutral-400 ${darkMode ? "bg-neutral-950 bg-opacity-40" : ""}`
          : `bg-neutral-200 ${darkMode ? "bg-neutral-500" : ""}`
      }
    
    }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button1.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default Button1;
