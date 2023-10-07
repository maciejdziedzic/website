import PropTypes from "prop-types";

const Button1 = ({ onClick, label, active }) => {
  return (
    <button
      className={`w-24 min-w-[96px] flex-shrink-0 h-7 my-0.5 tracking-wider font-bold rounded

    ${
      active
        ? "bg-neutral-400 dark:bg-neutral-600"
        : "bg-neutral-200 dark:bg-neutral-500"
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
