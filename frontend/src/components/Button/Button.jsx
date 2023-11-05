import PropTypes from "prop-types";
import { useContext } from "react";
import { DarkModeContext } from "../../contexts/DarkMode/DarkModeContext";
import "./Button.css";

const Button = ({ variant, label, onClick, disabled, active }) => {
  const { darkMode } = useContext(DarkModeContext);

  const handleButtonClick = (e) => {
    // Only toggle the pressed state if the button is not disabled
    if (!disabled && onClick) onClick(e);
  };

  const baseClass = "button-shared";
  const variantClass = variant === "button1" ? "button1" : "button2";
  const pressedClass = active ? "pressed" : "";
  const darkModeClass = darkMode ? "dark" : "";
  const disabledClass = disabled ? "disabled" : "";

  const classNames = `${baseClass} ${variantClass} ${pressedClass} ${darkModeClass} ${disabledClass}`;

  return (
    <button
      className={classNames}
      onClick={handleButtonClick}
      disabled={disabled}
      aria-pressed={active}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["button1", "button2"]).isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

export default Button;
