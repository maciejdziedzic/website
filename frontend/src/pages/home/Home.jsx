import { useState, useEffect } from "react";
import "./Home.css";
import { DarkModeContext } from "../../contexts/DarkMode/DarkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Home() {
  const { darkMode } = useContext(DarkModeContext);
  const [part1, setPart1] = useState("");
  const [assetsReturns, setAssetsReturns] = useState("");
  const [part2, setPart2] = useState("");
  const [macroCharts, setMacroCharts] = useState("");
  const [part3, setPart3] = useState("");
  const [recessionModel, setRecessionModel] = useState("");
  const [part4, setPart4] = useState("");
  const [allTextPrinted, setAllTextPrinted] = useState(false);

  const text1 =
    "Hello, welcome to my website.\nYou can find here three projects: ";
  const textAssetsReturns = "Assets Returns";
  const text2 = " - yearly returns from different assets across 1970-2022.";
  const textMacroCharts = "Macroeconomic Charts";
  const text3 = " - macroeconomic variables charts across.";
  const textRecessionModel = "Recession model";
  const text4 = " - model that predicts FED's policy.";

  useEffect(() => {
    let timer;
    if (part1.length < text1.length) {
      timer = setTimeout(
        () => setPart1((prev) => prev + text1[part1.length]),
        10
      );
    } else if (assetsReturns.length < textAssetsReturns.length) {
      timer = setTimeout(
        () =>
          setAssetsReturns(
            (prev) => prev + textAssetsReturns[assetsReturns.length]
          ),
        10
      );
    } else if (part2.length < text2.length) {
      timer = setTimeout(
        () => setPart2((prev) => prev + text2[part2.length]),
        10
      );
    } else if (macroCharts.length < textMacroCharts.length) {
      timer = setTimeout(
        () =>
          setMacroCharts((prev) => prev + textMacroCharts[macroCharts.length]),
        10
      );
    } else if (part3.length < text3.length) {
      timer = setTimeout(
        () => setPart3((prev) => prev + text3[part3.length]),
        10
      );
    } else if (recessionModel.length < textRecessionModel.length) {
      timer = setTimeout(
        () =>
          setRecessionModel(
            (prev) => prev + textRecessionModel[recessionModel.length]
          ),
        10
      );
    } else if (part4.length < text4.length) {
      timer = setTimeout(
        () => setPart4((prev) => prev + text4[part4.length]),
        10
      );
    } else {
      setAllTextPrinted(true);
    }
    return () => clearTimeout(timer);
  }, [part1, assetsReturns, part2, macroCharts, part3, recessionModel, part4]);

  return (
    <div className="flex items-center justify-center m-10">
      <div
        className={`items-center ${
          darkMode ? "text-dark-text" : "text-white-100"
        }`}
      >
        <div className="text-container font-thin">
          <p>{part1}</p>
          <br />
          <Link to="/project1">
            <span className="font-bold">{assetsReturns}</span>
            {part2}
          </Link>
          <br />
          <Link to="/project2">
            <span className="font-bold">{macroCharts}</span>
            {part3}
          </Link>
          <br />
          <Link to="/project3">
            <span className="font-bold">{recessionModel}</span>
            {part4}
          </Link>
          <br />
          {allTextPrinted && <span className="cursor">_</span>}
        </div>
      </div>
    </div>
  );
}

export default Home;
