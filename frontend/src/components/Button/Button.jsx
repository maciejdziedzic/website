import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../contexts/DarkMode/DarkModeContext";
import "./Button.css";

const Button = ({ variant, label, onClick, disabled, active }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isPressed, setPressed] = useState(active || false);

  const handleButtonClick = (e) => {
    setPressed(!isPressed);
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
      title={disabled ? "" : ""}
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

Button.defaultProps = {
  active: false,
};

export default Button;
