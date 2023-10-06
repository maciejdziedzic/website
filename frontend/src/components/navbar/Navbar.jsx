import { useState } from "react";
import { Link } from "react-router-dom";
import Sun from "../../assets/sun.svg";
import Moon from "../../assets/moon.svg";
import useDarkMode from "../../contexts/Darkmode/useDarkMode";

export default function Navbar() {
  const { darkMode, toggledarkMode } = useDarkMode();
  const [ProjectsOpen, setProjectsOpen] = useState(false);

  const toggleProjects = () => {
    setProjectsOpen(!ProjectsOpen);
  };

  return (
    <div className="flex h-16 ml-32 mr-32">
      <div
        className={
          darkMode === "dark"
            ? "flex-shrink-0 text-dark-text bg-red-100 bg-opacity-20 w-full"
            : "flex-shrink-0 bg-gray-300 w-full"
        }
      >
        <ul className="flex items-center justify-center space-x-36 tracking-widest text-lg h-full">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li onClick={toggleProjects}>Projects</li>
          <li>
            <img
              src={darkMode === "dark" ? Sun : Moon}
              onClick={toggledarkMode}
              alt="Toggle Dark Mode"
              className="w-6 h-6 cursor-pointer"
            />
          </li>
        </ul>
        {ProjectsOpen && (
          <div
            className={
              darkMode === "dark"
                ? "bg-red-100 bg-opacity-20 h-16 items-center flex justify-center"
                : "bg-gray-300  h-16 items-center flex justify-center"
            }
          >
            <ul className="flex space-x-16 justify-center text-lg tracking-widest">
              <li>Assets Return</li>
              <li>Macroeconomics Chart</li>
              <li>Recession Model</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
