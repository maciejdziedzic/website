import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./CollapsibleMenu.css";

export default function CollapsibleMenu() {
  return (
    <div className="collapsible-menu h-7">
      <div className="flex flex-row justify-around scale-75">
        <Link to="/project1" className=" hover-border-effect">
          Asset Returns
        </Link>
        <Link to="/project2" className=" hover-border-effect">
          Economic Indicators
        </Link>
        <Link to="/project3" className=" hover-border-effect">
          Python ML in Web
        </Link>
      </div>
    </div>
  );
}

CollapsibleMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};
