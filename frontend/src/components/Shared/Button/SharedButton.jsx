import PropTypes from "prop-types";
import { useContext } from "react";
import { DarkModeContext } from "../../../contexts/Darkmode/DarkModeContext";
import "./SharedButton.css";

const SharedButton = ({ variant, label, onClick, active, disabled }) => {
  const { darkMode } = useContext(DarkModeContext);

  const baseClass = "button-shared";
  const variantClass = variant === "button1" ? "button1" : "button2";
  const activeClass = active ? "bg-neutral-400" : "bg-neutral-200";
  const darkModeClass = darkMode ? "dark-mode" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  const classNames = `${baseClass} ${variantClass} ${activeClass} ${darkModeClass} ${disabledClass}`;

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      title={disabled ? "You can select up to 4 variables" : ""}
    >
      {label}
    </button>
  );
};

SharedButton.propTypes = {
  variant: PropTypes.oneOf(["button1", "button2"]).isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

export default SharedButton;