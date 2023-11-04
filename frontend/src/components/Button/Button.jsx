import PropTypes from "prop-types";
import { useContext } from "react";
import { DarkModeContext } from "../../contexts/DarkMode/DarkModeContext";
import "./Button.css";

const Button = ({ variant, label, onClick, active, disabled }) => {
  const { darkMode } = useContext(DarkModeContext);

  const baseClass = "button-shared";
  const variantClass = variant === "button1" ? "button1" : "button2";
  const activeClass = active ? "bg-neutral-500" : "bg-neutral-200";
  const darkModeClass = darkMode ? "dark" : "";
  const disabledClass = disabled ? "cursor-not-allowed" : "";

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

Button.propTypes = {
  variant: PropTypes.oneOf(["button1", "button2"]).isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool, // Removed .isRequired
  disabled: PropTypes.bool,
};

export default Button;
