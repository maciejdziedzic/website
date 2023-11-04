import { useContext } from "react";
import { DarkModeContext } from "../../contexts/DarkMode/DarkModeContext";

export default function Footer() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div>
      <div
        className={
          darkMode ? "border-t border-gray-600" : "border-t border-gray-100"
        }
      ></div>
      <div
        className={`flex justify-center text-xs p-1 ${
          darkMode ? " bg-neutral-700" : " bg-neutral-200"
        }`}
      >
        © 2023 Maciej Dziedzic. All Rights Reserved.
      </div>
    </div>
  );
}
