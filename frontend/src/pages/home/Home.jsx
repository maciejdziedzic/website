import { useState, useEffect } from "react";
import "./Home.css";
import { DarkModeContext } from "../../contexts/DarkMode/DarkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Home() {
  const { darkMode } = useContext(DarkModeContext);
  const [part1, setPart1] = useState("");
  const [part2, setPart2] = useState("");
  const [part3, setPart3] = useState("");
  const [part4, setPart4] = useState("");

  const text1 =
    "Hello, welcome to my website.\nYou can find here three projects: ";
  const text2 =
    "Assets Returns - yearly returns from different assets across 1970-2022";
  const text3 = "Macroeconomic Charts - macroeconomic variables charts across";
  const text4 = "Recession model - model that predicts FED's policy";

  useEffect(() => {
    if (part1.length < text1.length) {
      const timer1 = setTimeout(() => {
        const nextChar1 = text1[part1.length];
        setPart1((prev) => prev + nextChar1);
      }, 10);

      return () => clearTimeout(timer1);
    } else if (part2.length < text2.length) {
      const timer2 = setTimeout(() => {
        const nextChar2 = text2[part2.length];
        setPart2((prev) => prev + nextChar2);
      }, 10);

      return () => clearTimeout(timer2);
    } else if (part3.length < text3.length) {
      const timer3 = setTimeout(() => {
        const nextChar3 = text3[part3.length];
        setPart3((prev) => prev + nextChar3);
      }, 10);

      return () => clearTimeout(timer3);
    } else if (part4.length < text4.length) {
      const timer4 = setTimeout(() => {
        const nextChar4 = text4[part4.length];
        setPart4((prev) => prev + nextChar4);
      }, 10);

      return () => clearTimeout(timer4);
    }
  }, [part1, part2, part3, part4]);

  return (
    <div className="flex items-center justify-center  m-10">
      <div
        className={`items-center   ${
          darkMode ? "text-dark-text " : "text-white-100"
        }`}
      >
        <div className="text-container font-thin">
          <p>{part1}</p>
          <br />
          <Link to="/project1">{part2}</Link>
          <br />
          <Link to="/project2">{part3}</Link>
          <br />
          <Link to="/project3">{part4}</Link>

          <br />
          <span className="cursor">_</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
