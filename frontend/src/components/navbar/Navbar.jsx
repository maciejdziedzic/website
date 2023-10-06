import { useState } from "react";
import { Link } from "react-router-dom";
import Sun from "../../assets/sun.svg";
import Moon from "../../assets/moon.svg";
import useDarkMode from "../../contexts/Darkmode/useDarkMode";

export default function Navbar() {
  const { darkMode, toggledarkMode } = useDarkMode();
  const [ProjectsOpen, setProjectsOpen] = useState(false);

  const buttonHoverColor =
    darkMode === "dark" ? "hover:bg-gray-400" : "hover:bg-gray-400";
  const projectsActiveColor = ProjectsOpen ? "bg-gray-400" : "";

  const toggleProjects = () => {
    setProjectsOpen(!ProjectsOpen);
  };

  return (
    <div className="flex h-16 ">
      <div
        className={
          darkMode === "dark"
            ? "flex-shrink-0 text-dark-text bg-red-100 bg-opacity-20 w-full"
            : "flex-shrink-0 bg-gray-300 w-full"
        }
      >
        <ul className="flex items-center justify-center space-x-44 tracking-widest text-lg h-full font-semibold">
          <button className={`${buttonHoverColor} py-2 px-8 rounded`}>
            <Link to="/" className="block w-full h-full">
              HOME
            </Link>
          </button>
          <button className={`${buttonHoverColor} py-2 px-8 rounded`}>
            <Link to="/about">ABOUT</Link>
          </button>
          <button
            className={`${buttonHoverColor} ${projectsActiveColor} py-2 px-3 rounded`}
            onClick={toggleProjects}
          >
            PROJECTS ⏷
          </button>
          <li className="">
            <img
              src={darkMode === "dark" ? Sun : Moon}
              onClick={toggledarkMode}
              alt="Toggle Dark Mode"
              className="w-6 h-6 cursor-pointer"
            />
          </li>
        </ul>
        <div className="border-t border-gray-100"></div>
        {ProjectsOpen && (
          <div
            className={
              darkMode === "dark"
                ? "bg-red-100 bg-opacity-20 flex justify-center space-x-36"
                : "bg-gray-300 flex justify-center space-x-36"
            }
          >
            <ul className="flex flex-col space-y-4 text-lg  p-6">
              <button className="text-left hover:font-bold">
                Assets Return
              </button>
              <button className="text-left hover:font-bold w-60">
                Macroeconomic Charts
              </button>
              <button className="text-left hover:font-bold ">
                Recession Model
              </button>
            </ul>
            <div className="border-l border-gray-100 "></div>

            <ul className="flex flex-col space-y-4 text-lg p-6">
              <button className="text-left hover:font-bold">Data</button>
              <button className="text-left hover:font-bold w-40">
                Architecture
              </button>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
