import { useState } from "react";
import { Link } from "react-router-dom";
import Sun from "../../assets/sun.svg";
import Moon from "../../assets/moon.svg";
import useDarkMode from "../../contexts/DarkMode/useDarkMode";

export default function Navbar() {
  const { darkMode, toggledarkMode } = useDarkMode();
  const [ProjectsOpen, setProjectsOpen] = useState(false);

  const buttonHoverColor = darkMode ? "hover:font-bold" : "hover:font-bold";
  const projectsActiveColor = ProjectsOpen ? "font-bold" : "";

  const toggleProjects = () => {
    setProjectsOpen(!ProjectsOpen);
  };

  return (
    <div style={{ position: "sticky", top: "0", zIndex: "1000" }}>
      <div className="flex h-6 mb-5 ">
        <div
          className={
            darkMode
              ? "flex-shrink-0 text-dark-text bg-neutral-700 w-full"
              : "flex-shrink-0 w-full bg-neutral-100"
          }
        >
          <ul className="flex items-center justify-center space-x-4 text-sm h-full tracking-widest">
            <li className="w-40">
              <Link
                to="/"
                className={`${buttonHoverColor} block w-full h-full text-center `}
              >
                HOME
              </Link>
            </li>
            <li className="w-40">
              <Link
                to="/about"
                className={`${buttonHoverColor} block w-full h-full text-center `}
              >
                ABOUT
              </Link>
            </li>
            <li className="w-40">
              <span
                onClick={toggleProjects}
                className={`${buttonHoverColor} ${projectsActiveColor} block w-full h-full text-center  cursor-pointer`}
              >
                PROJECTS⏷
              </span>
            </li>
            <li className="w-40 flex justify-center">
              <img
                src={darkMode ? Sun : Moon}
                onClick={toggledarkMode}
                alt="Toggle Dark Mode"
                className="w-5 h-5 cursor-pointer"
              />
            </li>
          </ul>
          <div className="border-t border-gray-100 "></div>
          {ProjectsOpen && (
            <div
              className={
                darkMode
                  ? "bg-neutral-700 flex justify-center space-x-36"
                  : "bg-neutral-100 flex justify-center space-x-36"
              }
            >
              <ul className="flex flex-col space-y-4 text-sm  p-2">
                <Link to="/project1">
                  <button className="text-left hover:font-bold">
                    Assets Return
                  </button>
                </Link>
                <Link to="/project2">
                  <button className="text-left hover:font-bold w-60">
                    Macroeconomic Charts
                  </button>
                </Link>
                <Link to="/project3">
                  <button className="text-left hover:font-bold ">
                    Recession Model
                  </button>
                </Link>
              </ul>
              <div className="border-l border-gray-100 "></div>

              <ul className="flex flex-col space-y-4 text-sm p-6">
                <button className="text-left hover:font-bold">Data</button>
                <button className="text-left hover:font-bold">MODEL</button>
                <button className="text-left hover:font-bold w-40">
                  TECH STACK
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
