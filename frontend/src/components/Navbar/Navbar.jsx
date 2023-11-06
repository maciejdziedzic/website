import { useState } from "react";
import { Link } from "react-router-dom";
import useDarkMode from "../../contexts/DarkMode/useDarkMode";
import "./Navbar.css";
import { CiMail } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { FiSun } from "react-icons/fi";
import { GiMoon } from "react-icons/gi";
import { FaBars } from "react-icons/fa";

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [ProjectsOpen, setProjectsOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const buttonHoverColor = darkMode ? "hover:font-bold" : "hover:font-bold";
  const projectsActiveColor = ProjectsOpen ? "font-bold" : "";

  const toggleProjects = () => {
    setProjectsOpen(!ProjectsOpen);
  };

  const handleMenuItemClick = () => {
    setIsBurgerOpen(false);
  };

  return (
    <div className="" style={{ position: "sticky", top: "0", zIndex: "1000" }}>
      <div className="md:flex md:h-12 md:mb-5">
        <div
          className={
            darkMode
              ? "flex-shrink-0  bg-neutral-700 w-full"
              : "flex-shrink-0  bg-neutral-100 w-full"
          }
        >
          <ul className="md:flex items-center md:justify-center lg:justify-end text-sm font-light h-full tracking-widest ">
            <li className="w-40 hidden md:block">
              <Link
                to="/"
                className={`${buttonHoverColor} block w-full h-full text-center `}
              >
                HOME
              </Link>
            </li>
            <li className="w-40 hidden md:block">
              <Link
                to="/about"
                className={`${buttonHoverColor} block w-full h-full text-center `}
              >
                ABOUT
              </Link>
            </li>
            <li className="w-64 hidden md:block">
              <span
                onClick={toggleProjects}
                className={`${buttonHoverColor} ${projectsActiveColor} block w-full h-full text-center  cursor-pointer`}
              >
                PROJECTS⏷
              </span>
            </li>
            <div className="flex justify-between items-center">
              <div className="flex space-x-0.5 md:space-x-2 md:mr-8">
                <li className="w-6">
                  <a href="mailto:maciej.dziedzic9@gmail.com">
                    <CiMail className="cursor-pointer icon-hover icon-size" />
                  </a>
                </li>
                <li className="w-6">
                  <a
                    href="https://www.linkedin.com/in/maciej-d-404000103/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CiLinkedin className="cursor-pointer icon-hover icon-size" />
                  </a>
                </li>
                <li className="w-6">
                  <div
                    onClick={toggleDarkMode}
                    className="cursor-pointer icon-hover"
                  >
                    {darkMode ? (
                      <FiSun className="cursor-pointer sun icon-hover icon-size" />
                    ) : (
                      <GiMoon className="cursor-pointer moon icon-hover icon-size" />
                    )}
                  </div>
                </li>
              </div>
              {/* Burger Menu Icon */}
              <div className="flex items-center bg-green-600 md:hidden h-16 mr-5 ">
                <FaBars
                  className="burger-icon text-4xl mr-2 ml-2 "
                  onClick={() => setIsBurgerOpen(!isBurgerOpen)}
                />
              </div>
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
      {/* Mobile Navigation*/}
      {isBurgerOpen && (
        <div
          className={`md:hidden full-screen-menu ${darkMode ? "dark" : ""} ${
            isBurgerOpen ? "open" : ""
          }`}
        >
          <div className="w-full flex-col space-y-1 p-4  mt-2 ">
            <Link
              to="/"
              className="block block-mb p-2 rounded bg-neutral-700 mt-16"
              onClick={handleMenuItemClick}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block block-mb p-2 rounded"
              onClick={handleMenuItemClick}
            >
              About
            </Link>
            <Link
              to="/project1"
              className="block block-mb p-2 rounded"
              onClick={handleMenuItemClick}
            >
              Asset Returns
            </Link>
            <Link
              to="/project2"
              className="block block-mb p-2 rounded"
              onClick={handleMenuItemClick}
            >
              Macroeconomic Chart
            </Link>
            <Link
              to="/project3"
              className="block block-mb p-2 rounded"
              onClick={handleMenuItemClick}
            >
              Fed Policy Model
            </Link>
            <br />
            <Link
              to="/data"
              className="block block-mb p-2 rounded"
              onClick={handleMenuItemClick}
            >
              Data
            </Link>
            <Link
              to="/model"
              className="block block-mb p-2 rounded"
              onClick={handleMenuItemClick}
            >
              Model
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
