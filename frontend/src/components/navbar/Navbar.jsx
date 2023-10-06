import Sun from "../../assets/sun.svg";
import Moon from "../../assets/moon.svg";
import useDarkMode from "../../contexts/Darkmode/useDarkMode";

export default function Navbar() {
  const { darkMode, toggledarkMode } = useDarkMode();

  return (
    <div className="flex h-16">
      <div
        className={
          darkMode === "dark"
            ? "flex-shrink-0 text-dark-text bg-red-100 bg-opacity-20 w-full"
            : "flex-shrink-0 bg-gray-300 w-full"
        }
      >
        <ul className="flex items-center justify-center space-x-36 tracking-widest text-lg h-full">
          <li>Home</li>
          <li>Projects</li>
          <li>About</li>
          <li>
            <img
              src={darkMode === "dark" ? Sun : Moon}
              onClick={toggledarkMode}
              alt="Toggle Dark Mode"
              className="w-6 h-6 cursor-pointer"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
