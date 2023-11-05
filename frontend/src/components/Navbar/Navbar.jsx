import { useState } from "react";
import { Link } from "react-router-dom";
import useDarkMode from "../../contexts/DarkMode/useDarkMode";
import "./Navbar.css";
import { CiMail } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { FiSun } from "react-icons/fi";
import { GiMoon } from "react-icons/gi";

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [ProjectsOpen, setProjectsOpen] = useState(false);

  const buttonHoverColor = darkMode ? "hover:font-bold" : "hover:font-bold";
  const projectsActiveColor = ProjectsOpen ? "font-bold" : "";

  const toggleProjects = () => {
    setProjectsOpen(!ProjectsOpen);
  };

  return (
    <div style={{ position: "sticky", top: "0", zIndex: "1000" }}>
      <div className="flex h-12 mb-5 ">
        <div
          className={
            darkMode
              ? "flex-shrink-0  bg-neutral-700 w-full"
              : "flex-shrink-0  bg-neutral-100 w-full"
          }
        >
          <ul className="flex items-center justify-end text-sm font-light h-full tracking-widest">
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
            <li className="w-44">
              <span
                onClick={toggleProjects}
                className={`${buttonHoverColor} ${projectsActiveColor} block w-full h-full text-center  cursor-pointer`}
              >
                PROJECTS⏷
              </span>
            </li>
            <div className="flex justify-center w-40">
              <li className="w-8">
                <a href="mailto:maciej.dziedzic9@gmail.com">
                  <CiMail size="1.1rem" className="cursor-pointer icon-hover" />
                </a>
              </li>
              <li className="w-8">
                <a
                  href="https://www.linkedin.com/in/maciej-d-404000103/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CiLinkedin
                    size="1.1rem"
                    className="cursor-pointer icon-hover"
                  />
                </a>
              </li>
              <li className="w-12">
                <div
                  onClick={toggleDarkMode}
                  className="cursor-pointer icon-hover"
                >
                  {darkMode ? (
                    <FiSun
                      size="1rem"
                      className="cursor-pointer sun icon-hover"
                    />
                  ) : (
                    <GiMoon
                      size="1.1rem"
                      className="cursor-pointer moon icon-hover"
                    />
                  )}
                </div>
              </li>
            </div>
          </ul>

          <div
            className={
              darkMode ? "border-t border-gray-600" : "border-t border-gray-200"
            }
          ></div>
          {ProjectsOpen && (
            <div>
              <div
                className={
                  darkMode
                    ? "bg-neutral-700 flex justify-center space-x-36"
                    : "bg-neutral-100 flex justify-center space-x-36"
                }
              >
                <ul className="flex flex-col space-y-4 text-sm ml-2 p-2">
                  <Link to="/project1" onClick={toggleProjects}>
                    <button className="text-left hover:font-bold">
                      Asset Returns
                    </button>
                  </Link>
                  <Link to="/project2" onClick={toggleProjects}>
                    <button className="text-left hover:font-bold w-60">
                      Macroeconomic Chart
                    </button>
                  </Link>
                  <Link to="/project3" onClick={toggleProjects}>
                    <button className="text-left hover:font-bold ">
                      FED Policy Model
                    </button>
                  </Link>
                </ul>
                <div
                  className={
                    darkMode
                      ? "border-l border-gray-600 "
                      : "border-l border-gray-200 "
                  }
                ></div>
                <ul className="flex flex-col space-y-4 text-sm p-2">
                  <Link to="/data" onClick={toggleProjects}>
                    <button className="text-left hover:font-bold">Data</button>
                  </Link>
                  <Link to="/model" onClick={toggleProjects}>
                    <button className="text-left hover:font-bold w-40">
                      Model
                    </button>
                  </Link>
                </ul>
              </div>
              <div
                className={
                  darkMode
                    ? "border-t border-gray-600"
                    : "border-t border-gray-100"
                }
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
