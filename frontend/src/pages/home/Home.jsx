import { useState, useEffect } from "react";
import "./Home.css";
import { DarkModeContext } from "../../contexts/DarkMode/DarkModeContext";
import { useContext } from "react";

function Home() {
  const { darkMode } = useContext(DarkModeContext);
  const [part1, setPart1] = useState("");
  const [part2, setPart2] = useState("");

  const text1 = "Hello, welcome ";
  const text2 = "to the website";

  useEffect(() => {
    if (part1.length < text1.length) {
      const timer1 = setTimeout(() => {
        const nextChar1 = text1[part1.length];
        setPart1((prev) => prev + nextChar1);
      }, 30);

      return () => clearTimeout(timer1);
    } else if (part2.length < text2.length) {
      const timer2 = setTimeout(() => {
        const nextChar2 = text2[part2.length];
        setPart2((prev) => prev + nextChar2);
      }, 30);

      return () => clearTimeout(timer2);
    }
  }, [part1, part2]);

  return (
    <div
      className={
        darkMode
          ? "text-dark-text flex items-center justify-center mt-10"
          : "text-white-100 flex items-center justify-center mt-10"
      }
    >
      <div className="text-container">
        <span style={{ color: "" }}>{part1}</span>
        <span style={{ color: "" }}>{part2}</span>
        <span className="cursor">_</span>
      </div>
    </div>
  );
}

export default Home;
