import { useState, useEffect, useContext } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../contexts/DarkMode/DarkModeContext";

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
    "Hello, welcome to my website.\nYou can find here three projects based on real data:";
  const textAssetsReturns = "Assets Returns";
  const text2 = " - Yearly returns from different assets across 1970-2022";
  const textMacroCharts = "US Macroeconomic Overview";
  const text3 = " - Comprehensive chart of key U.S. economic indicators ";
  const textRecessionModel = "Recession model";
  const text4 = " - Model that predicts FED's policy";

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
        6
      );
    } else if (part2.length < text2.length) {
      timer = setTimeout(
        () => setPart2((prev) => prev + text2[part2.length]),
        6
      );
    } else if (macroCharts.length < textMacroCharts.length) {
      timer = setTimeout(
        () =>
          setMacroCharts((prev) => prev + textMacroCharts[macroCharts.length]),
        6
      );
    } else if (part3.length < text3.length) {
      timer = setTimeout(
        () => setPart3((prev) => prev + text3[part3.length]),
        6
      );
    } else if (recessionModel.length < textRecessionModel.length) {
      timer = setTimeout(
        () =>
          setRecessionModel(
            (prev) => prev + textRecessionModel[recessionModel.length]
          ),
        6
      );
    } else if (part4.length < text4.length) {
      timer = setTimeout(
        () => setPart4((prev) => prev + text4[part4.length]),
        6
      );
    } else {
      setAllTextPrinted(true);
    }
    return () => clearTimeout(timer);
  }, [part1, assetsReturns, part2, macroCharts, part3, recessionModel, part4]);

  return (
    <div className="flex items-center justify-center my-24 mx-auto">
      <div
        className={`items-center ${
          darkMode ? "text-dark-text" : "text-white-100"
        }`}
      >
        <div className="font-thin w-full max-w-2xl mx-4">
          <div className="text-left">
            <p>{part1}</p> <br />
            <div className="flex flex-col">
              <div className="flex items-center my-2">
                <Link
                  to="/project1"
                  className="flex-1 project-button text-black"
                >
                  {assetsReturns}
                </Link>
                <span className="ml-2 description">{part2}</span>
              </div>
              <div className="flex items-center my-2">
                <Link
                  to="/project2"
                  className="flex-1 project-button text-black"
                >
                  {macroCharts}
                </Link>
                <span className="ml-2 description">{part3}</span>
              </div>
              <div className="flex items-center my-2">
                <Link
                  to="/project3"
                  className="flex-1 project-button text-black"
                >
                  {recessionModel}
                </Link>
                <span className="ml-2 description">{part4}</span>
                {allTextPrinted && <span className="cursor">_</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
