import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../contexts/DarkMode/DarkModeContext";
import "./Button.css";

const Button = ({ variant, label, onClick, disabled }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isPressed, setPressed] = useState(false);

  const handleButtonClick = (e) => {
    // Toggle pressed state
    setPressed(!isPressed);
    // Call the passed onClick handler if any
    if (onClick) onClick(e);
  };

  const baseClass = "button-shared";
  const variantClass = variant === "button1" ? "button1" : "button2";
  const pressedClass = isPressed ? "pressed" : "";
  const darkModeClass = darkMode ? "dark" : "";
  const disabledClass = disabled ? "disabled" : "";

  const classNames = `${baseClass} ${variantClass} ${pressedClass} ${darkModeClass} ${disabledClass}`;

  return (
    <button
      className={classNames}
      onClick={handleButtonClick}
      disabled={disabled}
      aria-pressed={isPressed}
      title={disabled ? "You can select up to 4 variables" : ""}
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
};

export default Button;
