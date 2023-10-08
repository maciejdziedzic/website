import PropTypes from "prop-types";

function Button2({ label, onClick, active, disabled }) {
  return (
    <button
      className={`w-24 h-6 m-2 tracking-wider font-bold rounded 
                  ${
                    active
                      ? "bg-neutral-400 dark:bg-neutral-600"
                      : "bg-neutral-200 dark:bg-neutral-500"
                  }
                  ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
      title={disabled ? "You can select up to 4 variables" : ""}
    >
      {label}
    </button>
  );
}

Button2.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

export default Button2;
