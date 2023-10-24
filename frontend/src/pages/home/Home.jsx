import { useState, useEffect } from "react";
import "./Home.css";
import { DarkModeContext } from "../../contexts/DarkMode/DarkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Home() {
  const { darkMode } = useContext(DarkModeContext);
  const [part1, setPart1] = useState("");
  const [part2, setPart2] = useState("");

  const text1 = "Hello, welcome to my website. ";
  const text2 = "You can find here three projects:\n\n";

  useEffect(() => {
    if (part1.length < text1.length) {
      const timer1 = setTimeout(() => {
        const nextChar1 = text1[part1.length];
        setPart1((prev) => prev + nextChar1);
      }, 15);

      return () => clearTimeout(timer1);
    } else if (part2.length < text2.length) {
      const timer2 = setTimeout(() => {
        const nextChar2 = text2[part2.length];
        setPart2((prev) => prev + nextChar2);
      }, 10);

      return () => clearTimeout(timer2);
    }
  }, [part1, part2]);

  return (
    <div className="flex items-center justify-center m-10">
      <div
        className={`items-center justify-center ${
          darkMode ? "text-dark-text " : "text-white-100"
        }`}
      >
        <div className="text-container">
          <span>{part1}</span>
          <br />
          <pre>{part2}</pre>
          <Link to="/project1">
            Assets Returns - yearly returns from different assets across
            1970-2022
          </Link>
          <br />
          <Link to="/project2">
            Macroeconomic Charts - chosen variables that can be visualised in
            one chart
          </Link>
          <br />
          <Link to="/project3">
            Recession model - model that predicts SP500 future return, based on
            web scraped data and chat gpt interpretation of FED&apos;s official
            communication
          </Link>

          <br />
          <span className="cursor">_</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
