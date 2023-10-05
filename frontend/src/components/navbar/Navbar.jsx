import Sun from "../../assets/sun.svg";
import Moon from "../../assets/moon.svg";
import useDarkMode from "../../contexts/Darkmode/useDarkMode";

export default function Navbar() {
  const { darkMode, toggledarkMode } = useDarkMode();

  return (
    <div className="navbar">
      <ul className="list bg-slate-200 flex items-center m-5 space-x-20 justify-center tracking-wide">
        <li>Home</li>
        <li>Assets Return</li>
        <li>Macroeconomics Chart</li>
        <li>Recession Model</li>
        <li>About</li>
        <li>
          <img
            src={darkMode === "dark" ? Sun : Moon}
            onClick={toggledarkMode}
            alt="Toggle Dark Mode"
            className="w-6 h-6"
          />
        </li>
      </ul>
    </div>
  );
}
